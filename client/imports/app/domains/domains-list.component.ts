import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { DomainsObservable } from '../../../../both/collections/domains.collection';
import { Domain } from '../../../../both/models/domains.model';

import template from './domains-list.component.html';

@Component({
    selector: 'domains-list',
    template
})
export class DomainsListComponent {
    domains: Observable<Domain[]>;

    constructor() {
        this.domains = DomainsObservable.find({}).zone();
    }

    removeDomain(domain: Domain): void {
        DomainsObservable.remove(domain._id);
    }
}
