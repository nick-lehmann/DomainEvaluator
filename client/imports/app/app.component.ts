import { Component, OnInit } from "@angular/core";
import template from "./app.component.html";

import { DomainsObservable } from '../../../both/collections/domains.collection';

@Component({
    selector: "app",
    template,
})
export class AppComponent implements OnInit {
    domains: any;
    active: any;

    constructor() {
    }

    ngOnInit() {
        console.log('ngOnInit executed');
        this.domains = DomainsObservable.find().zone();
        this.active = {};
    }
}
