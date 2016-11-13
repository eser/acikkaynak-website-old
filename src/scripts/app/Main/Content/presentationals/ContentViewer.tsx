import * as React from 'react';
import { Link } from 'react-router';

import * as ReactMarkdown from 'react-markdown';

import { Conditional } from '../../Shared/presentationals/Conditional';

export interface ContentViewerPropsInterface {
    origin: string;
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
            <div>
                <ReactMarkdown source={this.getContent()} />

                <Conditional test={this.props.origin && this.props.origin.length > 0}>
                    <div className="text-right margin-top-15px">
                        <a href={this.props.origin}>
                            <i className="fa fa-fw fa-pencil-square-o" aria-hidden="true"></i> Bu sayfanın kaynağına ulaş
                        </a>
                    </div>
                </Conditional>
            </div>
        );
    }

}

export default ContentViewer;
