Energy.IndexController = Ember.Controller.extend({
	actions: {
		/*
			backToForm() is called when we press go to form button.
			In this method we clear the existing formData and set formSelected attribute to be true to render form.
		*/
		backToForm: function() {
			var formData = {
	    		timeCount: '',
	    		place: '',
	    		homeType: ''
	    	};
			this.setProperties ({
				'formSelected': true,
	    		'formData': formData,
	            'formError': false,
			});
		},
		/*
			submitForm() is caaled when we click on submit button.
			In this funtion we validate the form.
			If form is valid then we calculate the consumption. Otherwise we throw error in form submission.
		*/
		submitForm: function() {
			var formData = this.get('formData'),
				timeCount = formData.timeCount,
				timeCountNumber = Number(timeCount);
			this.setProperties({
				'timeError': false,
				'placeError': false,
				'homeTypeError': false,
				'formError': false
			});
			if(timeCount === '' || isNaN(timeCountNumber) || (timeCountNumber > 24 || timeCountNumber < 0)) {
				this.setProperties({
					'timeError': true,
					'formError': true
				});
			}
			if(formData.place === '') {
				this.setProperties({
					'placeError': true,
					'formError': true
				});
			}
			if(formData.homeType === '') {
				this.setProperties({
					'homeTypeError': true,
					'formError': true
				});
			}
			if(!this.get('formError')) {
				this.calculateConsumption();
			}
		}
	},
	/*
		In calculateConsumption() we calculate consumption based on the given parametrs.
		After calculation we render resultView in the indexView.
	*/
	calculateConsumption: function() {
		var baseValue = 10,
			ratePerUnit  = 3,
			formData = this.get('formData'),
			timeFactor = formData.timeCount,
			homeType = formData.homeType,
			typeFactor, consumption;
		if(homeType === 'HOUSE') {
			typeFactor = 2;
			averageData = this.get('avgHouseConsumption');
		} else if(homeType === 'BUILDING') {
			typeFactor = 1;
			averageData = this.get('avgBuildingConsumption');
		} else {
			typeFactor = 1.5;
			averageData = this.get('avgIglooConsumption');
		}
		consumption = baseValue + ratePerUnit * timeFactor * typeFactor;
		this.setProperties({
			'formSelected': false,
			'consumptionData': [consumption, averageData]
		});
	}
});