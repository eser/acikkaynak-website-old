declare var global: any;

import * as React from 'react';
import { NavLink } from 'react-router-dom';

interface LayoutContainerPropsInterface {
}

interface LayoutContainerStateInterface {
}

class LayoutContainer extends React.Component<LayoutContainerPropsInterface, LayoutContainerStateInterface> {
    constructor(props: LayoutContainerPropsInterface, context: any) {
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
    render(): any {
        return (
            <div>
                <div className="header">
                    <ul className="inner">
                        <li className="link"><NavLink exact={true} to="/" activeClassName="active">Haberler</NavLink></li>
                        <li className="link"><NavLink to="/content/" activeClassName="active">Kaynaklar</NavLink></li>
                        <li className="link"><NavLink to="/projects/" activeClassName="active">Projeler</NavLink></li>
                        <li className="link"><NavLink to="/organizations/" activeClassName="active">Organizasyonlar</NavLink></li>
                        <li className="link"><NavLink to="/about" activeClassName="active">Hakkımızda</NavLink></li>
                        <li className="buttons pull-right text-right">
                            <a href="https://s.acikkaynak.info/"><img src="https://s.acikkaynak.info/badge.svg" /></a>
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
        );
    }
}

export {
    LayoutContainerPropsInterface,
    LayoutContainerStateInterface,
    LayoutContainer,
};

export default LayoutContainer;
