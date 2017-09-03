/*********************************************************
   Author:  Renjith VR
   Version:     1.0
   Date:    31-Aug-2017   
   FileName:    ListContainerModel.js
   Description: Model classes for the app
**********************************************************/


var ListItemModel = Backbone.Model.extend({


    defaults: {
        'id': '',
        'schedule': '',
        'project_id': '',
        'network': '',
        'network_name': '',
        'network_thumb': '',
        'message': '',
        'data': '',
        'customer_approved': '',
        'manager_approved': '',
        'rejection_message': '',
        'rejection_message_manager': '',
        'created_at': '',
        'created_by': '',
        'created_by_id': '',
        'created_by_name': ''
    },

    initialize: function() {


        var customerApproved = this.get('customer_approved');
        var managerApproved = this.get('manager_approved');


        if (customerApproved == 1 && managerApproved == 1) {
            this.set('approved', 1);
            this.set('status', 'Approved')
        }

        if (customerApproved == 0 || managerApproved == 0) {
            this.set('pending', 1);
            this.set('status', 'Pending')
        }

        if (customerApproved == -1 || managerApproved == -1) {
            this.set('rejected', 1);
            this.set('status', 'Rejected')
        }

        this.setDatetime();

    },
    setDatetime: function() {
        var schedule = this.formateDateTime(this.get('schedule'));
        this.set('schedule', schedule);

        var createdAt = this.formateDateTime(this.get('created_at'));
        this.set('created_at', createdAt);

    },
    formateDateTime: function(datetime) {
        var DateFormat = datetime.substr(0, 7) + '/' + datetime.substr(7, 3) + " " + datetime.substr(10, 10);
        replacedDatetime = DateFormat.replace('-', '/');
        var Datetime = moment(replacedDatetime.toString()).locale('en').format('MM-DD-YYYY, hh:mm:ss A');
        return Datetime;

    }

});