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
    metadata: any;
    error: any;
}

export class Content extends React.Component<ContentPropsInterface, ContentStateInterface> {

    state: ContentStateInterface;
    model: ContentModel;

    constructor(props: ContentPropsInterface) {
        super(props);

        this.state = {
            datasource: null,
            metadata: null,
            error: false
        };

        this.model = app.services.get(ContentModel);
        this.updateDatasource(this.props);
    }

    componentWillReceiveProps(nextProps: ContentPropsInterface): void {
        this.updateDatasource(nextProps);

        window.scrollTo(0, 0);
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
            <ContentViewer datasource={this.state.datasource} metadata={this.state.metadata} />
        );
    }

    updateDatasource(props: ContentPropsInterface): void {
        this.model.getContent(props.params.splat)
            .then((response) => { this.setState({ datasource: response.datasource, metadata: response.metadata, error: false }); })
            .catch((err) => { this.setState({ datasource: null, metadata: null, error: err }); });
    }

}

export default Content;
