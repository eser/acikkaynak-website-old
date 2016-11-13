declare var global: any;

import * as React from 'react';
import { IndexLink, Link } from 'react-router';

import { app } from '../';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { combinedReducers } from './combinedReducers';

import * as constants from '../constants';

export interface LayoutPropsInterface {
    children: any;
}

export interface LayoutStateInterface {
}

export class Layout extends React.Component<LayoutPropsInterface, LayoutStateInterface> {

    static instance: Layout;

    store: any;
    state: LayoutStateInterface;

    constructor(props: LayoutPropsInterface) {
        super(props);

        const constructor_: any = this.constructor;
        if (constructor_.instance === undefined) {
            constructor_.instance = this;
        }

        const reduxDevtools = (window as any).__REDUX_DEVTOOLS_EXTENSION__;
        this.store = createStore(combinedReducers, reduxDevtools && reduxDevtools());
        this.state = {};
    }

    clickHandler(ev): void {
        const target: Element = ev.target;

        if (target.tagName === 'A') {
            const url = target.getAttribute('href');

            if (url !== null) {
                const navigationItem = app.navigationManager.identify(url);

                if (navigationItem !== null) {
                    app.history.push(navigationItem.getUrl());

                    ev.preventDefault();
                }
            }
        }
    }

    // the JSX syntax is quite intuitive but check out
    // https://facebook.github.io/react/docs/jsx-in-depth.html
    // if you need additional help
    render(): any {
        return (
            <Provider store={this.store}>
                <div>
                    <div className="header">
                        <ul className="inner">
                            <li><IndexLink to="/" activeClassName="active">Giriş</IndexLink></li>
                            <li><Link to="/content" activeClassName="active">İçerik</Link></li>
                            <li><Link to="/projects" activeClassName="active">Projeler</Link></li>
                            <li className="pull-right text-right">
                                <a href="http://github.com/acikkaynak/acikkaynak">
                                    <i className="fa fa-github fa-fw" aria-hidden="true"></i>
                                    açık kaynak
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="content">
                        <div className="inner" onClick={this.clickHandler.bind(this)}>
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </Provider>
        );
    }

}

export default Layout;
