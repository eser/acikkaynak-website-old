import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import AppStackContainer from './appStackContainer';

class AppStack {
    router: any;
    appClasses: { [key: string]: any };

    constructor(router, appClasses) {
        this.router = router;
        this.appClasses = appClasses;
    }

    renderToDOM(targetElement, fullRender = true): void {
        const renderMethod = fullRender ? ReactDOM.render : ReactDOM.hydrate;

        renderMethod(
            React.createElement(
                this.router.component,
                this.router.props,
                <AppStackContainer appStack={this} />,
            ),
            targetElement,
        );
    }

    renderToString(path): string {
        const context = {};

        return ReactDOMServer.renderToString(
            <StaticRouter location={path} context={context}>
                <AppStackContainer appStack={this} />
            </StaticRouter>
        );
    }
}

export {
    AppStack as default,
};
