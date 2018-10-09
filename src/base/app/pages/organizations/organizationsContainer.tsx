import * as React from 'react';

import appContext from '../../appContext';

import OrganizationListView from './organizationListView';
import LoadingView from '../shared/loadingView';
import ErrorView from '../shared/errorView';

interface OrganizationsContainerProps {
}

interface OrganizationsContainerState {
    datasource: any;
    error: string | false;
}

class OrganizationsContainer extends React.Component<OrganizationsContainerProps, OrganizationsContainerState> {
    constructor(props: OrganizationsContainerProps, context: any) {
        super(props, context);

        this.state = {
            datasource: null,
            error: false,
        };
    }

    componentWillMount(): void {
        this.updateDatasource();
    }

    componentWillReceiveProps(nextProps: OrganizationsContainerProps): void {
        this.updateDatasource();
    }

    render(): JSX.Element {
        if (this.state.error !== false) {
            console.error(this.state.error);

            return (
                <ErrorView message="An error occurred" />
            );
        }

        if (this.state.datasource === null) {
            return (
                <LoadingView />
            );
        }

        return (
            <div>
                <h1>Organizasyonlar</h1>

                <OrganizationListView datasource={this.state.datasource} />
            </div>
        );
    }

    updateDatasource(): void {
        const organizationService = appContext.get('organizationService');

        organizationService.getOrganizations()
            .then((response) => { this.setState({ datasource: response, error: false }); })
            .catch((err) => { this.setState({ datasource: null, error: err }); });
    }

}

export {
    OrganizationsContainer as default,
    OrganizationsContainerProps,
    OrganizationsContainerState,
};
