var SOCIView = Backbone.View.extend({
	render: function() {
		if (typeof this.beforeRender === 'function') {
			this.beforeRender();
		}

		var modelData = { };
		if (this.model && this.model instanceof Backbone.Model) {
			modelData = this.model.toJSON();
		}

		if (typeof this.template === 'function') {
			this.$el.html(this.template(modelData));
		}

		if (typeof this.afterRender === 'function') {
			this.afterRender();
		}
		return this;
	}
});
