import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

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
                this.activeDomain = <Domain>DomainsObservable.findOne(this.domainId);
                console.log(this.activeDomain);
            });
    }

    ngOnDestroy() {
        this.domainSub.unsubscribe();
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
