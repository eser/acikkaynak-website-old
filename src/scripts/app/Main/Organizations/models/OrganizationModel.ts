declare var fetch: Function;

import 'whatwg-fetch';

import * as constants from '../../../constants';

import { CacheContainer } from '../../../utils/CacheContainer';

export class OrganizationModel {

    cache: CacheContainer;
    dataSourceUrl: string;

    constructor() {
        this.cache = new CacheContainer();
        this.dataSourceUrl = 'https://raw.githubusercontent.com/acikkaynak/acikkaynak/master/organizations.json';
    }

    async getOrganizationsFetch(): Promise<any> {
        // console.log('fetch');
        const promise: Promise<any> = fetch(this.dataSourceUrl)
            .then((response) => response.json());

        this.cache.set([ 'organizations' ], promise);

        return await promise;
    }

    async getOrganizations(): Promise<any> {
        // console.log('get');
        return await (this.cache.get([ 'organizations' ]) || this.getOrganizationsFetch());
    }

}

export default OrganizationModel;
