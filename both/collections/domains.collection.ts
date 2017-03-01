import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

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


})
