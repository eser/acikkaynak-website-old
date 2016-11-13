import * as React from 'react';
import { Route, IndexRoute } from 'react-router';

import { app, App, AppModuleInterface } from '../';
import { NavigationItemInterface } from '../utils/NavigationManager';

// import { PageModel } from './Pages/models/PageModel';

import { Layout } from './Layout';
import { NotFound } from './Shared/containers/NotFound';
import { Home } from './Home/containers/Home';
import { Content } from './Content/containers/Content';
import { Projects } from './Projects/containers/Projects';

export interface PageInterface {
    page: string;
}

export class Main implements AppModuleInterface {

    get root(): any {
        return Layout.instance;
    }

    getRoutes(): any {
        return [
            (
                <Route key="route-main" path="/" component={Layout}>
                    <IndexRoute key="route-main-index" component={Home} />
                    <Route key="route-main-content" path="content/*" component={Content} />
                    <Route key="route-main-projects" path="projects/" component={Projects} />
                    <Route key="route-main-catch-all" path="*" component={NotFound} status={404} />
                </Route>
            )
        ];
    }

    getNavigationItems(): Map<string, NavigationItemInterface> {
        return new Map<string, NavigationItemInterface>([
            /*
            [
                'page',
                {
                    resolver: (url: string): PageInterface | null => {
                        if (url.substring(0, 8) !== '#/pages/') {
                            return null;
                        }

                        return {
                            page: decodeURIComponent(url.substring(8))
                        };
                    },
                    builder: (parameters: PageInterface): string => {
                        return `/pages/${encodeURIComponent(parameters.page)}`
                    },
                    prefetcher: (parameters: PageInterface): void => {
                        const model: PageModel = app.services.get(PageModel);

                        model.getPageByName(parameters.page);
                    }
                }
            ]
            */
        ]);
    }

}

export default Main;
