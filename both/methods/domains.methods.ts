import { Meteor } from 'meteor/meteor';
import { DomainsCollection } from '../collections/domains.collection';
import { Domain } from '../models/domains.model';

Meteor.methods({
	calculatePrice: function(id) {
		var domain: Domain = <Domain>DomainsCollection.findOne(id);
		var coefficients = Meteor.settings.public.coefficients;
		console.log(coefficients);

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

		var price =
			domain.length * coefficients.length +
			domain.hyphen * coefficients.hyphen +
			domain.words * coefficients.words +
			Math.pow(domain.age, 4) * coefficients.age +
			domain.year * coefficients.year +
			visitorsInt * coefficients.visitors +
			Math.log(domain.deGooglePreSLD) * coefficients.deGooglePreSLD +
			Math.pow(Math.log(domain.enGooglePreSLD), 3) * coefficients.enGooglePreSLD +
			Math.pow(Math.log(domain.preMDLS), 4) * coefficients.preMDLS +
			Math.pow(Math.log(domain.postMDLS), 4) * coefficients.postMDLS +
			cpcInt * coefficients.preCPC +
			cpcInt * coefficients.postCPC +
			domain.preCOMP * coefficients.preCOMP +
			Math.pow(Math.log(domain.HDAX), 0.5) * coefficients.HDAX +
			domain.googleAge * coefficients.googleAge +
			domain.wordsHyphen * coefficients.wordsHypen - 375.6;

			console.log(price);
			price = Math.exp(price);
			console.log(price);
	}
})
