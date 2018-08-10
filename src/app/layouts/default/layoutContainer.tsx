declare var global: any;

import * as React from 'react';
import { NavLink } from 'react-router-dom';

interface LayoutContainerProps {
}

interface LayoutContainerState {
}

class LayoutContainer extends React.Component<LayoutContainerProps, LayoutContainerState> {
    constructor(props: LayoutContainerProps, context: any) {
        super(props, context);

        this.state = {};
    }

    clickHandler(ev): void {
        const target: Element = ev.target;

        if (target.tagName === 'A') {
            const url = target.getAttribute('href');

            if (url !== null) {
                // const navigationItem = app.navigationManager.identify(url);

                // if (navigationItem !== null) {
                //     app.history.push(navigationItem.getUrl());

                //     ev.preventDefault();
                // }
            }
        }
    }

    // the JSX syntax is quite intuitive but check out
    // https://facebook.github.io/react/docs/jsx-in-depth.html
    // if you need additional help
    render(): JSX.Element {
        return (
            <div className="hero is-fullheight">
                <header className="header hero-head">
                    <nav className="navbar is-transparent" role="navigation" aria-label="main navigation">
                        <div className="container">
                            <div className="navbar-brand">
                                {/* <div className="navbar-item">
                                    ts-spa-boilerplate
                                </div> */}
                                <span className="navbar-burger burger" role="button" aria-label="menu" aria-expanded="false" data-target="navbarMenu">
                                    <span aria-hidden="true"></span>
                                    <span aria-hidden="true"></span>
                                    <span aria-hidden="true"></span>
                                </span>
                            </div>
                            <div id="navbarMenu" className="navbar-menu">
                                <div className="navbar-start">
                                    <NavLink exact={true} to="/" className="navbar-item" activeClassName="is-active">Haberler</NavLink>
                                    <NavLink to="/content/" className="navbar-item" activeClassName="is-active">Kaynaklar</NavLink>
                                    <NavLink to="/projects/" className="navbar-item" activeClassName="is-active">Projeler</NavLink>
                                    <NavLink to="/organizations/" className="navbar-item" activeClassName="is-active">Organizasyonlar</NavLink>
                                    <NavLink to="/about" className="navbar-item" activeClassName="is-active">Hakkımızda</NavLink>
                                </div>
                                <div className="navbar-end">
                                    <a className="navbar-item" href="https://acikkaynak-slack-inviter.herokuapp.com/"><img src="https://acikkaynak-slack-inviter.herokuapp.com/badge.svg" /></a>
                                    <a className="navbar-item" href="https://github.com/acikkaynak/acikkaynak"><img src="https://img.shields.io/github/stars/acikkaynak/acikkaynak.svg?style=social&amp;label=Star" /></a>
                                </div>
                            </div>
                        </div>
                    </nav>
                </header>
                <main className="section hero-body">
                    <div className="container">
                        <div className="content" onClick={this.clickHandler.bind(this)}>
                            {this.props.children}
                        </div>
                    </div>
                </main>
                {/* <footer className="footer hero-foot">
                    <div className="container">
                        <div className="content has-text-centered">
                            TypeScript SPA Boilerplate is a front-end development stack for starting with a structured, scaleable and adaptable basecode.<br />
                            Visit <a href="https://github.com/eserozvataf/ts-spa-boilerplate">GitHub page</a> for details. Apache License, Version 2.0
                        </div>
                    </div>
                </footer> */}
            </div>
        );
    }
}

export {
    LayoutContainer as default,
    LayoutContainerProps,
    LayoutContainerState,
};
