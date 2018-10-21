import cacheManager from 'es6-cachemanager/lib/esm';

const dataSourceUrl = 'https://raw.githubusercontent.com/acikkaynak/acikkaynak/master/organizations.json';

async function getOrganizationsFetch(): Promise<any> {
    // console.log('fetch', name);
    const promise: Promise<any> = fetch(dataSourceUrl)
        .then((response) => response.json());

    // cacheManager.setDirect([ 'organizations' ], promise);

    return await promise;
}

async function getOrganizations(): Promise<any> {
    return await cacheManager.get(
        [ 'organizations' ],
        () => getOrganizationsFetch(),
    );
}

function getOrganizationsRequestAction() {
    return async (dispatch, getState) => {
        dispatch({
            type: 'GET_ORGANIZATIONS_REQUEST_ACTION',
        });

        try {
            const result = await getOrganizations();

            dispatch({
                type: 'GET_ORGANIZATIONS_RESULT_SUCCESS_ACTION',
                payload: result,
            });
        }
        catch (ex) {
            dispatch({
                type: 'GET_ORGANIZATIONS_RESULT_FAILED_ACTION',
                payload: ex,
            });
        }
    };
}

export {
    getOrganizationsRequestAction as default,
};
