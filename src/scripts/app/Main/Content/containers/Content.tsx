import * as React from 'react';

export interface ContentPropsInterface {
}

export interface ContentStateInterface {
}

export class Content extends React.Component<ContentPropsInterface, ContentStateInterface> {

    state: ContentStateInterface;

    constructor(props: ContentPropsInterface) {
        super(props);
    }

    render(): any {
        return (
            <div>
                <h1>İçerik</h1>

                ...içerik buraya gelecek
            </div>
        );
    }

}

export default Content;
