import { MongoObservable } from 'meteor-rxjs';
import { Domain } from '../models/domains.model';

export const DomainsCollection = new MongoObservable.Collection<Domain>("domains-collection");
