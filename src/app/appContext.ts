import { ServiceLifetime, ServiceManager } from 'servicemanager';

import { CacheManager } from 'es6-cachemanager/lib/esm';
import { EventManager } from 'react-eventmanager/lib/esm';

import ContentService from './pages/content/contentService';
import ProjectService from './pages/projects/projectService';
import OrganizationService from './pages/organizations/organizationService';

const appContext = new ServiceManager();

appContext.set('cacheManager', new CacheManager(), ServiceLifetime.Singleton);
appContext.set('eventManager', new EventManager(), ServiceLifetime.Singleton);

appContext.set('contentService', () => new ContentService(), ServiceLifetime.Transient);
appContext.set('projectService', () => new ProjectService(), ServiceLifetime.Transient);
appContext.set('organizationService', () => new OrganizationService(), ServiceLifetime.Transient);

export {
    appContext as default,
};
