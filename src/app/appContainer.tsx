import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import * as PropTypes from 'prop-types';

import { appContext } from './appContext';

import { AuthorizationFilter } from './modules/shared/authorizationFilter';

import { LayoutContainer } from './layouts/default/layoutContainer';
import { HomeContainer } from './modules/home/homeContainer';
import { ContentContainer } from './modules/content/contentContainer';
import { ProjectsContainer } from './modules/projects/projectsContainer';
import { OrganizationsContainer } from './modules/organizations/organizationsContainer';
import { NotFoundContainer } from './modules/notFound/notFoundContainer';

import { LoadingView } from './modules/shared/loadingView';

interface AppContainerPropsInterface {
}

interface AppContainerStateInterface {
    initialized: boolean;
}

class AppContainer extends React.Component<AppContainerPropsInterface, AppContainerStateInterface> {
    static contextTypes = {
        router: PropTypes.object,
    };

    static childContextTypes = {
        appContainer: PropTypes.object,
        appContext: PropTypes.object,
    };

    constructor(props: AppContainerPropsInterface, context: any) {
        super(props, context);

        this.state = {
            initialized: false,
        };
    }

    async init() {
        if (this.state.initialized) {
            return;
        }

        const sessionService = appContext.get('sessionService');

        await sessionService.init();

        this.setState({
            initialized: true,
        });

        // this.events.emit('appInit');
    }

    // TODO designed to be a shortcut, and will be removed on production...
    setUser(user) {
        appContext.get('eventManager').emit('userInformationHasChanged', user);
    }

    async logout() {
        const sessionService = appContext.get('sessionService');

        await sessionService.logout();

        this.context.router.history.push('/login');
    }

    getChildContext() {
        return {
            appContainer: this,
            appContext: appContext,
        };
    }

    componentWillMount() {
        this.init();
    }

    render() {
        if (this.state === null || !this.state.initialized) {
            return (
                <LoadingView />
            );
        }

        return (
            <Switch>
                <Route path="/" exact={true} strict={true} render={() => <LayoutContainer><HomeContainer /></LayoutContainer>} />

                <Route path="/content/*" exact={false} strict={true} render={(props) => <LayoutContainer><ContentContainer contentPath={props.match.params[0]} /></LayoutContainer> } />

                <Route path="/projects/" exact={true} strict={true} render={() => <LayoutContainer><ProjectsContainer /></LayoutContainer>} />
                <Route path="/organizations/" exact={true} strict={true} render={() => <LayoutContainer><OrganizationsContainer /></LayoutContainer>} />

                {/* <Route path="/login" exact={true} strict={true} render={() => <LoginContainer />} />
                <Route path="/settings" exact={true} strict={true} render={() => <AuthorizationFilter><LayoutContainer><SettingsContainer /></LayoutContainer></AuthorizationFilter>} /> */}

                <Route render={() => <NotFoundContainer />} />
            </Switch>
        );
    }
}

export {
    AppContainer,
};

export default AppContainer;
