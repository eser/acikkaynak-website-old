declare var fetch: Function;

import 'whatwg-fetch';

import * as constants from '../../../constants';

import { CacheContainer } from '../../../utils/CacheContainer';

export class ContentModel {

    cache: CacheContainer;
    dataSourceUrl: string;

    constructor() {
        this.cache = new CacheContainer();
        this.dataSourceUrl = 'https://raw.githubusercontent.com/acikkaynak/acikkaynak/master/Icerik/';
    }

    async getContentFetch(contentUrl: string): Promise<any> {
        // console.log('fetch');
        const promise: Promise<any> = fetch(`${this.dataSourceUrl}${contentUrl}`)
            .then((response) => response.text());

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

        console.log(contentUrl_);

        // console.log('get');
        return await (this.cache.get([ 'content', contentUrl_ ]) || this.getContentFetch(contentUrl_));
    }

}

export default ContentModel;
