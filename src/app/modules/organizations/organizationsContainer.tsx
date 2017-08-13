import * as React from 'react';
import * as PropTypes from 'prop-types';

import { OrganizationListView } from './organizationListView';
import { LoadingView } from '../shared/loadingView';
import { ErrorView } from '../shared/errorView';

interface OrganizationsContainerPropsInterface {
}

interface OrganizationsContainerStateInterface {
    datasource: any;
    error: string | false;
}

class OrganizationsContainer extends React.Component<OrganizationsContainerPropsInterface, OrganizationsContainerStateInterface> {
    static contextTypes = {
        appContext: PropTypes.object,
    };

    constructor(props: OrganizationsContainerPropsInterface, context: any) {
        super(props, context);

        this.state = {
            datasource: null,
            error: false,
        };
    }

    componentWillMount(): void {
        this.updateDatasource();
    }

    componentWillReceiveProps(nextProps: OrganizationsContainerPropsInterface): void {
        this.updateDatasource();
    }

    render(): any {
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
        const organizationService = this.context.appContext.get('organizationService');

        organizationService.getOrganizations()
            .then((response) => { this.setState({ datasource: response, error: false }); })
            .catch((err) => { this.setState({ datasource: null, error: err }); });
    }

}

export {
    OrganizationsContainerPropsInterface,
    OrganizationsContainerStateInterface,
    OrganizationsContainer,
};

export default OrganizationsContainer;
