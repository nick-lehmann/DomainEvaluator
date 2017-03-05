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

    fetchSearchResults(domainID) {

        var domain: Domain = this.getDomain(domainID);

        // german preSLD
        var queryGerman = "http://www.google.com/search?q=" + domain.preSLD + "&lr=lang_de";

        console.log("German query: ", queryGerman);

        var res = HTTP.call('GET', queryGerman);
        console.log(res);
        var $ = cheerio.load(res.content);
        var germanParts = $('#resultStats').text().split(' ');
        var germanResults = parseInt(germanParts[1].replace('.', '')); // in German, the single dot is used as decimal separator

        // english preSLD
        var queryEnglish = "http://www.google.com/search?q=" + domain.preSLD + "&lr=lang_en&hl=lang_en";
        var res = HTTP.call('GET', queryEnglish);
        var $ = cheerio.load(res.content);
        var englishParts = $('#resultStats').text().split(' ');
        var englishResults = parseInt(englishParts[1].replace('.', ''));

        if ( germanResults && englishResults ) {
            DomainsCollection.update({
                _id: domain._id
            }, {
                $set: {
                    deGooglePreSLD: germanResults,
                    enGooglePreSLD: englishResults
                }
            });
            return true;
        } else {
            console.error('Request to Google Web Search failed');
            return false;
        }
    }

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
