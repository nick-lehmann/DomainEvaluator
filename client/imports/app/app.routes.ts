import { Route } from '@angular/router';

import { DomainsListComponent } from './domains/domains-list.component';
import { DomainsDetailComponent } from './domains/domains-detail.component';

export const routes: Route[] = [
    {
        path: '',
        component: DomainsListComponent
    }, {
        path: 'domain/:domainId',
        component: DomainsDetailComponent
    }
]
