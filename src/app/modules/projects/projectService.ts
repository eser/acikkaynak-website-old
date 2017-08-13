// declare var process: any;

import { cacheManager, CacheManager } from 'es6-cachemanager/lib/esm';

const dataSourceUrl = 'https://raw.githubusercontent.com/acikkaynak/acikkaynak/master/projects.json';

class ProjectService {
    async getProjectsFetch(): Promise<any> {
        // console.log('fetch', name);
        const promise: Promise<any> = fetch(dataSourceUrl)
            .then((response) => response.json());

        // cacheManager.setDirect([ 'projects' ], promise);

        return await promise;
    }

    async getProjects(): Promise<any> {
        return await cacheManager.get(
            [ 'projects' ],
            () => this.getProjectsFetch(),
        );
    }
}

export {
    ProjectService,
};

export default ProjectService;
