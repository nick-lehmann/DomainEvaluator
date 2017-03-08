import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';
import { Meteor } from 'meteor/meteor';

import 'rxjs/add/operator/map';

import { DomainsObservable } from '../../../../both/collections/domains.collection';
import { Domain } from '../../../../both/models/domains.model';

import template from './domains-detail.component.html';

@Component({
    selector: 'domains-detail',
    template
})
export class DomainsDetailComponent {
    domainId: string;
    domainSub: Subscription;
    activeDomain: Domain;

    constructor (private route: ActivatedRoute) {}

    ngOnInit() {
        this.domainSub = this.route.params
            .map(params => params['domainId'])
            .subscribe(domainId => {
                this.domainId = domainId;
                console.log(domainId);
                this.activeDomain = DomainsObservable.findOne(domainId);
            });
    }

    ngOnDestroy() {
        this.domainSub.unsubscribe();
    }

    fetchPostSLD() {
        Meteor.call('fetchPostSLD', this.activeDomain._id);
    }

    fetchGoogleData() {
        Meteor.call('fetchGoogleData', this.activeDomain._id);
    }

    fetchFinance() {
        Meteor.call('fetchFinance', this.activeDomain._id);
    }

    calculatePrice() {
        Meteor.call('calculatePrice', this.activeDomain._id);
    }

    reload() {
        this.activeDomain = DomainsObservable.findOne(this.domainId);
    }

    saveDomain() {
        console.log('form submitted');
        DomainsObservable.update({
            _id: this.activeDomain._id
        }, {
            $set: {
                domain: this.activeDomain.domain,
                age: this.activeDomain.age,
                year: this.activeDomain.year,
                visitors: this.activeDomain.visitors
            }
        });
    }
}
