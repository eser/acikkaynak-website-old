declare var fetch: Function;

import 'whatwg-fetch';

import * as constants from '../../../constants';

import { CacheContainer } from '../../../utils/CacheContainer';

export class ContentModel {

    cache: CacheContainer;
    dataOriginUrl: string;
    dataSourceUrl: string;

    constructor() {
        this.cache = new CacheContainer();
        this.dataOriginUrl = 'https://github.com/acikkaynak/acikkaynak/tree/master/Icerik/';
        this.dataSourceUrl = 'https://raw.githubusercontent.com/acikkaynak/acikkaynak/master/Icerik/';
    }

    async getContentFetch(contentUrl: string): Promise<any> {
        // console.log('fetch');
        const promise: Promise<any> = fetch(`${this.dataSourceUrl}${contentUrl}`)
            .then((response) => response.text())
            .then((text) => (
                {
                    origin: `${this.dataOriginUrl}${contentUrl}`,
                    datasource: text
                }
            ));

        this.cache.set([ 'content', contentUrl ], promise);

        return await promise;
    }

    async getContent(contentUrl: string): Promise<any> {
        let contentUrl_ = contentUrl || '';

        if (contentUrl_.length === 0) {
            contentUrl_ = 'README.md';
        }
        else if (contentUrl_.substr(-3) !== '.md') {
            if (contentUrl_.substr(-1) === '/') {
                contentUrl_ += 'README.md';
            }
            else {
                contentUrl_ += '/README.md';
            }
        }

        // console.log('get');
        return await (this.cache.get([ 'content', contentUrl_ ]) || this.getContentFetch(contentUrl_));
    }

}

export default ContentModel;
