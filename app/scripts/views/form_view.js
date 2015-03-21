Energy.FormView = Ember.View.extend({
	templateName: 'form',
	classNames: ['wrapper'],
	click: function(event) {
		var elem = $(event.target),
			formData = this.get('controller.formData');
		if(elem.hasClass('home_type')) {
			this.$('.home_type').removeClass('selected_type');
			elem.addClass('selected_type');
			if(elem.hasClass('house_type')) {
				formData.homeType = 'HOUSE';
			} else if(elem.hasClass('building_type')) {
				formData.homeType = 'BUILDING';
			} else if(elem.hasClass('igloo_type')) {
				formData.homeType = 'IGLOO';
			}
		}
	}
})