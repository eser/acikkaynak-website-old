import cacheManager from 'es6-cachemanager/lib/esm';

const dataOriginUrl = 'https://github.com/acikkaynak/acikkaynak/tree/master/Icerik/';
const dataSourceUrl = 'https://raw.githubusercontent.com/acikkaynak/acikkaynak/master/Icerik/';

async function getContentFetch(contentPath: string): Promise<any> {
    // console.log('fetch', name);
    const promise: Promise<any> = fetch(`${dataSourceUrl}${contentPath}`)
        .then((response) => response.text())
        .then((text) => (
            {
                datasource: text,
                metadata: {
                    originUrl: `${dataOriginUrl}${contentPath}`,
                    sourceUrl: `${dataSourceUrl}${contentPath}`,
                    path: contentPath
                }
            }
        ));

    // cacheManager.setDirect([ 'content', contentUrl ], promise);

    return await promise;
}

async function getContent(contentPath: string): Promise<any> {
    let contentPath_ = contentPath || '';

    if (contentPath_.length === 0) {
        contentPath_ = 'README.md';
    }
    else if (contentPath_.substr(-3) !== '.md') {
        if (contentPath_.substr(-1) === '/') {
            contentPath_ += 'README.md';
        }
        else {
            contentPath_ += '/README.md';
        }
    }

    return await cacheManager.get(
        [ 'content', contentPath_ ],
        () => getContentFetch(contentPath_),
    );
}

function getContentRequestAction(contentPath: string) {
    return async (dispatch, getState) => {
        dispatch({
            type: 'GET_CONTENT_REQUEST_ACTION',
        });

        try {
            const result = await getContent(contentPath);

            dispatch({
                type: 'GET_CONTENT_RESULT_SUCCESS_ACTION',
                payload: result,
            });
        }
        catch (ex) {
            dispatch({
                type: 'GET_CONTENT_RESULT_FAILED_ACTION',
                payload: ex,
            });
        }
    };
}

export {
    getContentRequestAction as default,
};
