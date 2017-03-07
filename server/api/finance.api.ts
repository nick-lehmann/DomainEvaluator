import { DomainsCollection } from '../../both/collections/domains.collection';
import { Domain } from '../../both/models/domains.model';
import { HTTP } from 'meteor/http';

var cheerio = require('cheerio');

class FinanceAPI {
    constructor () {}

    getDomain(domainID): Domain {
        // check if parameter is an id
        var domain: Domain = <Domain>DomainsCollection.findOne({
            _id: domainID
        });
        return domain;
    }

    getHDAX () {

        var res = HTTP.call('GET', 'http://www.quotenet.com/index/HDAX');

        if ( res.statusCode == 200 ) {
            var $ = cheerio.load(res.content);
            var hdaxRaw = $('.pricebox .content').find('th')[0].children[0].data
            var hdax = parseFloat(hdaxRaw.replace(',', ''));
            return hdax;
        } else {
            console.error('Request to Finance api failed');
            return false;
        }

    }

    fetchHDAX ( domainID ) {

        var domain: Domain = this.getDomain(domainID);
        var hdax = this.getHDAX();

        if ( hdax ) {
            DomainsCollection.update({
                _id: domain._id
            }, {
                $set: {
                    HDAX: hdax
                }
            });
            return true;
        }
        return false;
    }
}

export default new FinanceAPI();
