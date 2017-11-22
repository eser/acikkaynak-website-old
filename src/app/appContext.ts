import { ServiceLifetime, ServiceManager } from 'servicemanager/lib/esm';
import { CacheManager } from 'es6-cachemanager/lib/esm';
import { EventManager } from 'react-eventmanager/lib/esm';

import { ContentService } from './modules/content/contentService';
import { ProjectService } from './modules/projects/projectService';
import { OrganizationService } from './modules/organizations/organizationService';

const appContext = new ServiceManager();

appContext.set('cacheManager', new CacheManager(), ServiceLifetime.Singleton);
appContext.set('eventManager', new EventManager(), ServiceLifetime.Singleton);

appContext.set('contentService', () => new ContentService(), ServiceLifetime.Transient);
appContext.set('projectService', () => new ProjectService(), ServiceLifetime.Transient);
appContext.set('organizationService', () => new OrganizationService(), ServiceLifetime.Transient);

export {
    appContext,
};

export default appContext;
