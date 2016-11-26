import * as React from 'react';

import { app } from '../../../';

import { OrganizationModel } from '../models/OrganizationModel';
import { OrganizationList } from '../presentationals/OrganizationList';
import { Loading } from '../../Shared/presentationals/Loading';
import { Error } from '../../Shared/presentationals/Error';

export interface OrganizationsPropsInterface {
    params: any;
}

export interface OrganizationsStateInterface {
    datasource: any;
    error: any;
}

export class Organizations extends React.Component<OrganizationsPropsInterface, OrganizationsStateInterface> {

    state: OrganizationsStateInterface;
    model: OrganizationModel;

    constructor(props: OrganizationsPropsInterface) {
        super(props);

        this.state = {
            datasource: null,
            error: false
        };

        this.model = app.services.get(OrganizationModel);
        this.updateDatasource(props);
    }

    componentWillReceiveProps(nextProps: OrganizationsPropsInterface): void {
        this.updateDatasource(nextProps);
    }

    render(): any {
        if (this.state.error) {
            console.error(this.state.error);

            return (
                <Error message="Bir hata oluştu" />
            );
        }

        if (this.state.datasource === null) {
            return (
                <Loading />
            );
        }

        return (
            <div>
                <h1>Organizasyonlar</h1>

                <OrganizationList datasource={this.state.datasource} />
            </div>
        );
    }

    updateDatasource(props: OrganizationsPropsInterface): void {
        this.model.getOrganizations()
            .then((response) => { this.setState({ datasource: response, error: false }); })
            .catch((err) => { this.setState({ datasource: null, error: err }); });
    }

}

export default Organizations;
