import * as React from 'react';
import { Link } from 'react-router';

import * as path from 'path-browser';
import * as ReactMarkdown from 'react-markdown';

import { Conditional } from '../../Shared/presentationals/Conditional';

export interface ContentViewerPropsInterface {
    datasource: any;
    metadata: any;
}

export interface ContentViewerStateInterface {
}

export class ContentViewer extends React.Component<ContentViewerPropsInterface, ContentViewerStateInterface> {

    state: ContentViewerStateInterface;

    constructor(props: ContentViewerPropsInterface) {
        super(props);
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

    render(): any {
        return (
            <div>
                <ReactMarkdown source={this.getContent()} />

                <Conditional test={this.props.metadata && this.props.metadata.originUrl && this.props.metadata.originUrl.length > 0}>
                    <div className="text-right margin-top-15px">
                        <a href={this.props.metadata.originUrl}>
                            <i className="fa fa-fw fa-pencil-square-o" aria-hidden="true"></i> Bu sayfanın kaynağına ulaş
                        </a>
                    </div>
                </Conditional>
            </div>
        );
    }

}

export default ContentViewer;
