import * as React from 'react';
import { Link } from 'react-router-dom';

import * as path from 'path-browser';
import * as ReactMarkdown from 'react-markdown';

import ConditionalView from '../shared/conditionalView';

interface ContentViewProps {
    datasource: any;
    metadata: any;
}

interface ContentViewState {
}

class ContentView extends React.Component<ContentViewProps, ContentViewState> {
    constructor(props: ContentViewProps, context: any) {
        super(props, context);
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

    getContent(): string {
        const data = this.props.datasource,
            metadata = this.props.metadata;

        let basePath = '#/content/';

        if (metadata && metadata.path) {
            basePath = path.join(basePath, this.getPathDirname(metadata.path));
        }

        return data.replace(
            /\[([^\]]*)\]\(([^\)]*)\)/g,
            (all, first, second) => `[${first}](${this.isAbsolutePath(second) ? second : path.join(basePath, second)})`
            // (all, first, second) => `[${first}](${second})`
        );
    }

    render(): JSX.Element {
        return (
            <React.Fragment>
                <ReactMarkdown source={this.getContent()} />

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
