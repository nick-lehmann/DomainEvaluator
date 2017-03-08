import { Meteor } from 'meteor/meteor';
import { DomainsCollection } from '../../both/collections/domains.collection';
import { Domain } from '../../both/models/domains.model';

import financeAPI from '../api/finance.api';
import googleAPI from '../api/google.api';

Meteor.methods({
	calculatePrice: function(id) {
		var domain: Domain = <Domain>DomainsCollection.findOne(id);
		console.log(domain);
		var coefficients = Meteor.settings.coefficients;

		var visitorsInt = 0;
		if (domain.visitors < 0.5635) {
			visitorsInt = 1;
		} else if (domain.visitors < 30.24) {
			visitorsInt = 2;
		} else if (domain.visitors < 51.51) {
			visitorsInt = 3;
		} else if (domain.visitors < 57.25) {
			visitorsInt = 4;
		} else {
			visitorsInt = 5;
		}

		var cpcInt = 0;
		var cpc = domain.preCPC;
		if (cpc < 0.08) {
			cpcInt = 1;
		} else if (cpc < 0.77) {
			cpcInt = 2;
		} else if (cpc < 1.75) {
			cpcInt = 3;
		} else if (cpc < 1.96) {
			cpcInt = 4;
		} else {
			cpcInt = 5;
		}

		var computed: any = {};
		computed.length = domain.length * coefficients.length;
		computed.hyphen = domain.hyphen * coefficients.hyphen;
		computed.words = domain.words * coefficients.words;

		computed.age = Math.pow(domain.age, 4) * coefficients.age;
		computed.year = domain.year * coefficients.year;
		computed.visitors = visitorsInt * coefficients.visitors;

		computed.deGooglePreSLD = Math.log(domain.deGooglePreSLD) * coefficients.deGooglePreSLD;
		computed.enGooglePreSLD = Math.pow(Math.log(domain.enGooglePreSLD), 3) * coefficients.enGooglePreSLD;
		if ( domain.preMDLS ) {
			computed.preMDLS = Math.pow(Math.log(domain.preMDLS), 4) * coefficients.preMDLS;
		} else {
			computed.preMDLS = 0;
		}
		if ( domain.postMDLS ) {
			computed.postMDLS = Math.pow(Math.log(domain.postMDLS), 4) * coefficients.postMDLS;
		} else {
			computed.postMDLS = 0;
		}
		computed.preCPC = cpcInt * coefficients.preCPC;
		computed.postCPC = cpcInt * coefficients.postCPC;
		computed.preCOMP = domain.preCOMP * coefficients.preCOMP;

		computed.HDAX = Math.pow(Math.log(domain.HDAX), 0.5) * coefficients.HDAX;
		computed.googleAge = domain.googleAge * coefficients.googleAge;
		computed.wordsHyphen = domain.wordsHyphen * coefficients.wordsHyphen;
		computed.intercept = 375.6;

		console.log(computed);

		var price = 0;
		for ( var el in computed) {
			price += computed[el];
		}
		console.log(price);

		price = Math.exp(price);
		console.log(price);

		DomainsCollection.update({_id: id}, {
			$set: {
				'price': Math.round(price)
			}
		});
	},

	fetchPostSLD: function ( domainId ) {
		console.log('method: fetch postSLD');
		var postSLD = googleAPI.fetchPostSLD( domainId );
		console.log('method: fetched', postSLD);
		if ( postSLD ) {
			return postSLD;
		} else {
			return false;
		}
	},

	fetchGoogleData: function ( domainId ) {
		console.log('method: fetch google traffic data');
		googleAPI.fetchSearchResults( domainId );
		googleAPI.fetchGoogleTrafficData( domainId );
	},

	fetchFinance: function ( domainId ) {
		console.log('method: fetch finance');
		var hdax = financeAPI.fetchHDAX( domainId )
		if ( hdax ) {
			return hdax;
		} else {
			return false;
		}
	}
})
