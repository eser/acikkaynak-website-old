import * as React from 'react';

import * as path from 'path-browser';
import ReactMarkdown from 'react-markdown';

import ConditionalView from '../shared/conditionalView';

interface ContentViewProps {
    datasource: any;
    metadata: any;
    history: any;
}

interface ContentViewState {
}

class ContentView extends React.Component<ContentViewProps, ContentViewState> {
    actionRefs: { [key: string]: any };
    elementRefs: { [key: string]: any };

    constructor(props: ContentViewProps, context: any) {
        super(props, context);

        this.actionRefs = {
            transformLinkUri: this.transformLinkUri.bind(this),
            handleClick: this.handleClick.bind(this),
        };

        this.elementRefs = {
            markdownContainer: React.createRef(),
        };
    }

    isAbsolutePath(pathString: string): boolean {
        return /^(?:\/|[a-z]+:\/\/)/.test(pathString);
    }

    getPathDirname(pathString: string): string {
        const lastSlashIndex = pathString.lastIndexOf('/');

        if (lastSlashIndex === -1) {
            return '';
        }

        return pathString.substr(0, lastSlashIndex);
    }

    transformLinkUri(uri: string): string {
        if (this.isAbsolutePath(uri)) {
            return uri;
        }

        const { metadata } = this.props;

        if (metadata && metadata.path) {
            const basePath = this.getPathDirname(metadata.path);

            return path.join(basePath, uri);
        }

        return uri;
    }

    handleClick(ev): void {
        if (ev && ev.target && ev.target.tagName === 'A' && ev.target.href) {
            const uri = ev.target.getAttribute('href');

            ev.preventDefault();
            this.props.history.push(uri);
        }
    }

    render(): JSX.Element {
        return (
            <React.Fragment>
                <div ref={this.elementRefs.markdownContainer} onClick={this.actionRefs.handleClick}>
                    <ReactMarkdown source={this.props.datasource} transformLinkUri={this.actionRefs.transformLinkUri} />
                </div>

                <ConditionalView test={this.props.metadata && this.props.metadata.originUrl && this.props.metadata.originUrl.length > 0}>
                    <div className="has-text-right">
                        <a href={this.props.metadata.originUrl}>
                            <i className="fa fa-fw fa-pencil-square-o" aria-hidden="true"></i> Bu sayfanın kaynağına ulaş
                        </a>
                    </div>
                </ConditionalView>
            </React.Fragment>
        );
    }
}

export {
    ContentView as default,
    ContentViewProps,
    ContentViewState,
};
