import * as React from 'react';
import * as PropTypes from 'prop-types';

import { ContentView } from './contentView';
import { LoadingView } from '../shared/loadingView';
import { ErrorView } from '../shared/errorView';

interface ContentContainerPropsInterface {
    contentPath: string;
}

interface ContentContainerStateInterface {
    datasource: any;
    metadata: any;
    error: string | false;
}

class ContentContainer extends React.Component<ContentContainerPropsInterface, ContentContainerStateInterface> {
    static contextTypes = {
        appContext: PropTypes.object,
    };

    constructor(props: ContentContainerPropsInterface, context: any) {
        super(props, context);

        this.state = {
            datasource: null,
            metadata: null,
            error: false,
        };
    }

    componentWillMount(): void {
        this.updateDatasource(this.props.contentPath);
    }

    componentWillReceiveProps(nextProps: ContentContainerPropsInterface): void {
        this.updateDatasource(nextProps.contentPath);
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
            <ContentView datasource={this.state.datasource} metadata={this.state.metadata} />
        );
    }

    updateDatasource(contentPath: string): void {
        const contentService = this.context.appContext.get('contentService');

        contentService.getContent(contentPath)
            .then((response) => { this.setState({ datasource: response.datasource, metadata: response.metadata, error: false }); })
            .catch((err) => { this.setState({ datasource: null, metadata: null, error: err }); });
    }

}

export {
    ContentContainerPropsInterface,
    ContentContainerStateInterface,
    ContentContainer,
};

export default ContentContainer;
