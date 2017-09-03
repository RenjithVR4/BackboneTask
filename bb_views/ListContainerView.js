/*********************************************************
   Author:  Renjith VR
   Version:     1.0
   Date:    31-Aug-2017   
   FileName:    ListContainerView.js
   Description: View classes with router for the app
**********************************************************/



app = {

    models: {},
    views: {},
    collections: {},
    routers: {},
    init: function() {
        directory = new app.ListItems(posts);
        moreinfo = new app.Moreinfo(posts);
        appRouter = new app.routers.Router();
        Backbone.history.start();
    }

}

app.routers.Router = Backbone.Router.extend({

    routes: {
        'filter/:type': 'urlFilter'
    },

    urlFilter: function(type) {
        directory.filterType = type;
        directory.trigger('change:filterType');
    }

});


var viewHelpers = {

    showPopup: function() {
        $('[data-popup-open]').on('click', function(e) {
            var targeted_popup_class = jQuery(this).attr('data-popup-open');
            $('[data-popup="' + targeted_popup_class + '"]').fadeIn(350);
        });

        $('[data-popup-close]').on('click', function(e) {
            var targeted_popup_class = jQuery(this).attr('data-popup-close');
            $('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);
        });
    }
};


app.ListContainerView = SOCIView.extend({
    template: _.template($('#ListContainerView').html()),
    tagName: 'tr',
    events: {
        'click .remove-item': 'removeItem'
    },
    initialize: function(data) {
        var _this = this;
        this.collection = new ListItemCollection(data);
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        this.delegateEvents();
        return this;
    },
    removeItem: function(e) {
        var thisid = this.$(e.currentTarget).parent('td').data("id");
        var thisitem = this.collection.get(thisid);
        this.collection.remove(thisitem);
        this.remove();
    }
});

app.Moreinfo = app.ListContainerView.extend({
    tagName: 'tr',

    initialize: function(data) {
        this.collection = new ListItemCollection(data);
        viewHelpers.showPopup();
        this.getId();

    },
    getId: function() {
        var _this = this;
        $('.info-lnk').click(function() {
            var id = $(this).attr('id');
            _this.getDatabyId(id);
        });
    },
    getDatabyId: function(id) {
        var _this = this;
        var data = [];

        getData = this.collection.get(id);

        var message = getData['attributes'].message.trim();
        var scheduledDateTime = getData['attributes'].schedule.trim();
        var networkType = getData['attributes'].network.trim();
        var networkName = getData['attributes'].network_name.trim();
        var networkThumbNail = getData['attributes'].network_thumb.trim();
        var createdDatetime = getData['attributes'].created_at.trim();
        var createdByName = getData['attributes'].created_by_name.trim();
        var status = getData['attributes'].status.trim();

        $(".network-type").html(networkType);
        $(".network-name").html(networkName);
        $(".message").html(message);
        $(".created-by").html(createdByName);
        $(".created-at").html(createdDatetime);
        $(".scheduled-at").html(scheduledDateTime);
        $(".status").html(status);
        $('.tumbNail').attr('src', networkThumbNail);
    }

});

app.ListItems = Backbone.View.extend({

    el: '#wrapper',

    initialize: function(data) {
        this.collection = new ListItemCollection(data);;
        this.render();

        this.on('change:searchFilter', this.filterBySearch, this);
        // this.collection.on('sort', this.render, this);
        this.listenTo(this.collection, 'reset', this.render);
        this.listenTo(this.collection, 'sort', this.render);
        this.getStatus();

        viewHelpers.showPopup();
    },

    events: {
        'keyup #searchBox': 'searchFilter',
        'click #sort': 'sortCollection',
    },

    render: function() {
        var self = this;
        $('#takehome_body').empty();
        _.each(this.collection.models, function(item) {
            self.renderList(item);
        }, this);
    },

    renderList: function(item) {
        var newitem = new app.ListContainerView({
            model: item
        });
        $('#takehome_body').append(newitem.render().el);
        // this.delegateEvents();
    },

    getTypes: function() {
        return _.uniq(this.collection.pluck('type'));
    },
    getStatus: function() {

        var approved = _.filter(this.collection.models, function(item) {
            return item.get('approved');
        });

        var pending = _.filter(this.collection.models, function(item) {
            return item.get('pending');
        });

        var rejected = _.filter(this.collection.models, function(item) {
            return item.get('rejected');
        });

        this.setCountData(approved.length, pending.length, rejected.length);


    },
    setCountData: function(c1, c2, c3) {
        $('#approved').html("Approved : " + c1);
        $('#pending').html("Pending : " + c2);
        $('#rejected').html("Rejected : " + c3);
    },

    searchFilter: function(e) {
        this.searchFilter = e.target.value;
        this.trigger('change:searchFilter');
    },

    filterBySearch: function() {
        this.collection.reset(posts, { silent: true });
        var filterString = this.searchFilter;

        filterByMessage = _.filter(this.collection.models, function(item) {
            return item.get('message').indexOf(filterString) !== -1;
        });

        filterByName = _.filter(this.collection.models, function(item) {
            return item.get('created_by_name').indexOf(filterString) !== -1;
        });

        if (filterByMessage.length > 0) {
            this.collection.reset(filterByMessage);
        }

        if (filterByName.length > 0) {
            this.collection.reset(filterByName);
        }

        var moreInfo = new app.Moreinfo;

        moreInfo.initialize();

    },
    sortCollection: function() {
        this.collection.reset(posts, { silent: true });
        var sortType = $("#sortField").val();
        var sortOrder = $("#sortOrder").val();

        appRouter.navigate('filter/' + sortType + '-' + sortOrder)

        if (sortOrder == 'desc') {

           
            var filtered = _.filter(this.collection.models, function(item) {
                return item.get('id');
            });

            if (sortType == 'created_at') {
                var createdDatetime = [];

                createdDatetime = _.sortBy(filtered, function(o) {
                    return new moment(o.attributes.created_at);
                }).reverse();
                this.collection.reset(createdDatetime);

            } else if (sortType == 'schedule') {
                var scheduleDatetime = [];

                scheduleDatetime = _.sortBy(filtered, function(o) {
                    return new moment(o.attributes.schedule);
                }).reverse();

                this.collection.reset(scheduleDatetime);

            } else {
                var createdByName = [];

                createdByName = _.sortBy(filtered, function(o) {
                    return o.attributes.created_by_name;
                }).reverse();

                this.collection.reset(createdByName);
            }


        } else {

            this.collection.comparator = sortType;
            this.collection.sort();
        }

        var moreInfo = new app.Moreinfo;

        moreInfo.getId();

    }

});