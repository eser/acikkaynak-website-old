import * as React from 'react';

import { app } from '../../../';

import { ContentModel } from '../models/ContentModel';
import { ContentViewer } from '../presentationals/ContentViewer';
import { Loading } from '../../Shared/presentationals/Loading';
import { Error } from '../../Shared/presentationals/Error';

export interface ContentPropsInterface {
    params: any;
}

export interface ContentStateInterface {
    datasource: any;
    origin: string|null;
    error: any;
}

export class Content extends React.Component<ContentPropsInterface, ContentStateInterface> {

    state: ContentStateInterface;
    model: ContentModel;

    constructor(props: ContentPropsInterface) {
        super(props);

        this.state = {
            datasource: null,
            origin: null,
            error: false
        };

        this.model = app.services.get(ContentModel);
        this.updateDatasource(this.props);
    }

    componentWillReceiveProps(nextProps: ContentPropsInterface): void {
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
            <ContentViewer datasource={this.state.datasource} origin={this.state.origin} />
        );
    }

    updateDatasource(props: ContentPropsInterface): void {
        this.model.getContent(props.params.splat)
            .then((response) => { this.setState({ datasource: response.datasource, origin: response.origin, error: false }); })
            .catch((err) => { this.setState({ datasource: null, origin: null, error: err }); });
    }

}

export default Content;
