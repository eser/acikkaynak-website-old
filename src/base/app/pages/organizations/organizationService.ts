// declare var process: any;

import cacheManager from 'es6-cachemanager/lib/esm';

const dataSourceUrl = 'https://raw.githubusercontent.com/acikkaynak/acikkaynak/master/organizations.json';

class OrganizationService {
    async getOrganizationsFetch(): Promise<any> {
        // console.log('fetch', name);
        const promise: Promise<any> = fetch(dataSourceUrl)
            .then((response) => response.json());

        // cacheManager.setDirect([ 'organizations' ], promise);

        return await promise;
    }

    async getOrganizations(): Promise<any> {
        return await cacheManager.get(
            [ 'organizations' ],
            () => this.getOrganizationsFetch(),
        );
    }
}

export {
    OrganizationService as default,
};
