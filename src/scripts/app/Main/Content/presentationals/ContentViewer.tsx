import * as React from 'react';
import { Link } from 'react-router';

import * as ReactMarkdown from 'react-markdown';

export interface ContentViewerPropsInterface {
    datasource: any;
}

export interface ContentViewerStateInterface {
}

export class ContentViewer extends React.Component<ContentViewerPropsInterface, ContentViewerStateInterface> {

    state: ContentViewerStateInterface;

    constructor(props: ContentViewerPropsInterface) {
        super(props);
    }

    getContent(): string {
        const data = this.props.datasource;

        return data.replace(
            /\[([^\]]*)\]\(([^\)]*)\)/g,
            (all, first, second) => `[${first}](#/content/${second})`
        );
    }

    render(): any {
        return (
            <ReactMarkdown source={this.getContent()} />
        );
    }

}

export default ContentViewer;
