import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AppContext from '../../appContext';

import ContentView from './contentView';
import LoadingView from '../shared/loadingView';
import ErrorView from '../shared/errorView';

import getContentRequestAction from '../../actions/getContentRequestAction';

interface ContentContainerProps {
    content: any;
    getContentRequestAction: (contentPath: string) => void;
    contentPath: string;
}

interface ContentContainerState {
}

class ContentContainer extends React.Component<ContentContainerProps, ContentContainerState> {
    constructor(props: ContentContainerProps, context: any) {
        super(props, context);
    }

    componentDidMount(): void {
        this.update(this.props.contentPath);
    }

    componentDidUpdate(prevProps: ContentContainerProps): void {
        if (this.props.contentPath !== prevProps.contentPath) {
            this.update(this.props.contentPath);
        }
    }

    update(contentPath: string): void {
        this.props.getContentRequestAction(contentPath);
    }

    render(): JSX.Element {
        if (this.props.content.error !== false) {
            console.error(this.props.content.error);

            return (
                <ErrorView message="An error occurred" />
            );
        }

        if (this.props.content.data === null) {
            return (
                <LoadingView />
            );
        }

        return (
            <AppContext.Consumer>
                {(startupArgs: any) => <ContentView datasource={this.props.content.data.datasource} metadata={this.props.content.data.metadata} history={startupArgs.history} />}
            </AppContext.Consumer>
        );
    }
}

const mapStateToProps = (state) => ({
    content: state.content,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getContentRequestAction,
}, dispatch);

const ContentContainerConnected = connect(mapStateToProps, mapDispatchToProps)(ContentContainer);

export {
    ContentContainerConnected as default,
    ContentContainer,
    ContentContainerProps,
    ContentContainerState,
};
