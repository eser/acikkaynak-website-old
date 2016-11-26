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
                            <li className="link"><IndexLink to="/" activeClassName="active">Giriş</IndexLink></li>
                            <li className="link"><Link to="/content/" activeClassName="active">İçerik</Link></li>
                            <li className="link"><Link to="/projects/" activeClassName="active">Projeler</Link></li>
                            <li className="link"><Link to="/organizations/" activeClassName="active">Organizasyonlar</Link></li>
                            <li className="buttons pull-right text-right">
                                <a href="http://s.acikkaynak.info/slackin/"><img src="http://s.acikkaynak.info/slackin/badge.svg" /></a>
                                <a href="https://github.com/acikkaynak/acikkaynak"><img src="https://img.shields.io/github/stars/acikkaynak/acikkaynak.svg?style=social&amp;label=Star" /></a>
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
