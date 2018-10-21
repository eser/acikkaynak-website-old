import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import OrganizationListView from './organizationListView';
import LoadingView from '../shared/loadingView';
import ErrorView from '../shared/errorView';

import getOrganizationsRequestAction from '../../actions/getOrganizationsRequestAction';

interface OrganizationsContainerProps {
    organizations: any;
    getOrganizationsRequestAction: () => void;
}

interface OrganizationsContainerState {
}

class OrganizationsContainer extends React.Component<OrganizationsContainerProps, OrganizationsContainerState> {
    constructor(props: OrganizationsContainerProps, context: any) {
        super(props, context);
    }

    componentWillMount(): void {
        this.update();
    }

    componentDidUpdate(prevProps: OrganizationsContainerProps): void {
        // this.update();
    }

    update(): void {
        this.props.getOrganizationsRequestAction();
    }

    render(): JSX.Element {
        if (this.props.organizations.error !== false) {
            console.error(this.props.organizations.error);

            return (
                <ErrorView message="An error occurred" />
            );
        }

        if (this.props.organizations.data === null) {
            return (
                <LoadingView />
            );
        }

        return (
            <div>
                <h1>Organizasyonlar</h1>

                <OrganizationListView datasource={this.props.organizations.data} />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    organizations: state.organizations,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getOrganizationsRequestAction,
}, dispatch);

const OrganizationsContainerConnected = connect(mapStateToProps, mapDispatchToProps)(OrganizationsContainer);

export {
    OrganizationsContainerConnected as default,
    OrganizationsContainer,
    OrganizationsContainerProps,
    OrganizationsContainerState,
};
