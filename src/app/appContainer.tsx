import * as React from 'react';
import { Route, Switch } from 'react-router';

import AppContext from './appContext';

import LayoutContainer from './layouts/default/layoutContainer';
import HomeContainer from './pages/home/homeContainer';
import ContentContainer from './pages/content/contentContainer';
import ProjectsContainer from './pages/projects/projectsContainer';
import OrganizationsContainer from './pages/organizations/organizationsContainer';
import AboutContainer from './pages/about/aboutContainer';
import NotFoundContainer from './pages/notFound/notFoundContainer';

// stylesheets
import './assets/styles.scss';
import './assets/fonts.scss';

interface AppContainerProps {
    startupArgs: { [key: string]: any }
}

interface AppContainerState {
    initialized: boolean;
}

class AppContainer extends React.Component<AppContainerProps, AppContainerState> {
    constructor(props: AppContainerProps, context: any) {
        super(props, context);

        this.state = {
            initialized: false,
        };
    }

    async init(): Promise<void> {
        if (this.state.initialized) {
            return;
        }

        this.setState({
            initialized: true,
        });

        // this.events.emit('appInit');
    }

    componentDidMount(): void {
        this.init();
    }

    render(): JSX.Element {
        return (
            <AppContext.Provider value={this.props.startupArgs}>
                <Switch>
                    <Route path="/" exact={true} strict={true} render={() => <LayoutContainer><HomeContainer /></LayoutContainer>} />

                    <Route path="/content/*" exact={false} strict={true} render={(props) => <LayoutContainer><ContentContainer contentPath={props.match.params[0]} /></LayoutContainer> } />

                    <Route path="/projects/" exact={true} strict={true} render={() => <LayoutContainer><ProjectsContainer /></LayoutContainer>} />
                    <Route path="/organizations/" exact={true} strict={true} render={() => <LayoutContainer><OrganizationsContainer /></LayoutContainer>} />
                    <Route path="/about" exact={true} strict={true} render={() => <LayoutContainer><AboutContainer /></LayoutContainer>} />

                    <Route render={() => <NotFoundContainer />} />
                </Switch>
            </AppContext.Provider>
        );
    }
}

export {
    AppContainer as default,
};
