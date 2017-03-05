import { Mongo } from 'meteor/mongo';
import { Domain } from '../models/domains.model';

export const DomainsCollection = new Mongo.Collection('domains-collection');

DomainsCollection.before.insert(function(id, doc) {
    // preSLD
    var preSLD = doc.domain.split('.')[0];
    console.log('preSLD: ' + preSLD);
    doc.preSLD = preSLD;

    // Length
    doc.length = preSLD.length;

    // Hyphen
    doc.hyphen = 0;
    for ( var i = 0; i < preSLD.length; i++) {
        if ( preSLD[i] == '-' ) {
            doc.hyphen++;
        }
    }
});

DomainsCollection.before.update(function( userId, doc, fieldNames, modifier, options ) {

    // trim postSLD to avoid splitting it into more words
    // than actually there
    if ( modifier.$set.postSLD ) {
        modifier.$set.postSLD = modifier.$set.postSLD.trim();

        // new postSLD is different from old
        if ( modifier.$set.postSLD != doc.postSLD ) {
            // set word count
            modifier.$set.words = modifier.$set.postSLD.split(' ').length;
            modifier.$set.wordsHyphen = modifier.$set.words * doc.hyphen;
        }
    }
});
