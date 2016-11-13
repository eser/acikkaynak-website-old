declare var fetch: Function;

import 'whatwg-fetch';

import * as constants from '../../../constants';

import { CacheContainer } from '../../../utils/CacheContainer';

export class ProjectModel {

    cache: CacheContainer;
    dataSourceUrl: string;

    constructor() {
        this.cache = new CacheContainer();
        this.dataSourceUrl = 'https://raw.githubusercontent.com/acikkaynak/acikkaynak/master/projects.json';
    }

    async getProjectsFetch(): Promise<any> {
        // console.log('fetch');
        const promise: Promise<any> = fetch(this.dataSourceUrl)
            .then((response) => response.json());

        this.cache.set([ 'projects' ], promise);

        return await promise;
    }

    async getProjects(): Promise<any> {
        // console.log('get');
        return await (this.cache.get([ 'projects' ]) || this.getProjectsFetch());
    }

}

export default ProjectModel;
