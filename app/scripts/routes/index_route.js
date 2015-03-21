Energy.IndexRoute = Ember.Route.extend({
    model: function(param) {
    	$('body').addClass('loading_div');
    	return new Ember.RSVP.Promise(function(resolve, reject) {
    		Ember.run.later(this, function(){
    			resolve();
    		}, 500);
    	});
    },
    afterModel: function(model, transition) {
    	$('body').removeClass('loading_div');
    },
    /*
        setupController() is used to set initial properties of a controller.
    */
    setupController: function(controller, model) {
    	var formData = {
    		timeCount: '',
    		place: '',
    		homeType: ''
    	};
    	controller.setProperties({
    		'formSelected': true,
    		'formData': formData,
            'formError': false,
            'avgHouseConsumption': 70,
            'avgBuildingConsumption': 45,
            'avgIglooConsumption': 60
    	});
    }
});