import { Meteor } from 'meteor/meteor';
import { DomainsCollection } from '../../both/collections/domains.collection';
import { Domain } from '../../both/models/domains.model';

class GoogleAPI {
    constructor() {

    }

    realCall(query) {

        // get domain like done in fetchAndStore
        // google(query, function( err, res ) {
        //     var postSLD = res.$('#_FQd a ').text();
        //     postSLD = postSLD.replace(/-/, ' ');
        //     console.log(postSLD);
        // });
    }

    fetchAndStore(domainID, selection) {

        // check if parameter is an id
        var domain: Domain = <Domain>DomainsCollection.findOne({
            _id: domainID
        });
        if (domain == undefined ) {
            domain: Domain = <Domain>DomainsCollection.findOne({
                domain: domainID
            });
            if ( domain == undefined ) {
                return false;
            }
        }

        console.log(domain)

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
