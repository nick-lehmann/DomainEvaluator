import { DomainsCollection } from '../../both/collections/domains.collection';
import { Domain } from '../../both/models/domains.model';
import { HTTP } from 'meteor/http';

cheerio = require('cheerio');

class GoogleAPI {
    constructor() {

    }

    getDomain(domainID) {
        // check if parameter is an id
        var domain: Domain = <Domain>DomainsCollection.findOne({
            _id: domainID
        });
        if (domain == undefined ) {
            return false;
        } else {
            return domain;
        }
    }

    getPostSLD(preSLD) {

        var query = 'http://www.google.com/search?q=' + preSLD
        var res = HTTP.call('GET', query);

        if ( res.statusCode == 200 ) {
            var $ = cheerio.load(res.content);
            var postSLD = $('#_FQd a').text();
            postSLD = postSLD.replace(/-/, ' ');
            return postSLD;
        } else {
            console.error('Request to Google Web Search failed');
            return false;
        }

    }

    googleTrafficData(domainID) {

        var domain: Domain = this.getDomain(domainID);

        var googleCache = JSON.parse(Assets.getText('googleCache.json'));
        var cachedGoogleEntry: Domain = <Domain>googleCache[domain.domain];

        if ( cachedGoogleEntry !== undefined ) {
            DomainsCollection.update({
                _id: domain._id
            }, {
                $set: cachedGoogleEntry
            })
        } else {
            console.error('no data cached for ' + domain.domain );
        }

    }
}

export default new GoogleAPI();
