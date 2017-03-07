import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { DomainsObservable } from '../../../../both/collections/domains.collection';
import { Domain } from '../../../../both/models/domains.model';

import template from './domains-addform.component.html';

@Component({
    selector: 'domain-addform',
    template
})
export class DomainsAddformComponent {
    addForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit() {
        this.addForm = this.formBuilder.group({
            domain: ['', Validators.required]
        });
    }

    addDomain(): void {
        if (this.addForm.valid) {
            DomainsObservable.insert(this.addForm.value);
            this.addForm.reset();
        }
    }
}
