import cacheManager from 'es6-cachemanager/lib/esm';

const dataSourceUrl = 'https://raw.githubusercontent.com/acikkaynak/acikkaynak/master/projects.json';

async function getProjectsFetch(): Promise<any> {
    // console.log('fetch', name);
    const promise: Promise<any> = fetch(dataSourceUrl)
        .then((response) => response.json());

    // cacheManager.setDirect([ 'projects' ], promise);

    return await promise;
}

async function getProjects(): Promise<any> {
    return await cacheManager.get(
        [ 'projects' ],
        () => getProjectsFetch(),
    );
}

function getProjectsRequestAction() {
    return async (dispatch, getState) => {
        dispatch({
            type: 'GET_PROJECTS_REQUEST_ACTION',
        });

        try {
            const result = await getProjects();

            dispatch({
                type: 'GET_PROJECTS_RESULT_SUCCESS_ACTION',
                payload: result,
            });
        }
        catch (ex) {
            dispatch({
                type: 'GET_PROJECTS_RESULT_FAILED_ACTION',
                payload: ex,
            });
        }
    };
}

export {
    getProjectsRequestAction as default,
};
