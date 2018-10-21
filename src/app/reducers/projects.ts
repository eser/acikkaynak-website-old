const initialState = {
    error: false,
    data: null,
};

function projectsReducer(state: any = initialState, message: any): any {
    if (message.type === 'GET_PROJECTS_REQUEST_ACTION') {
        return { ...state, error: false, data: null };
    }

    if (message.type === 'GET_PROJECTS_RESULT_SUCCESS_ACTION') {
        return { ...state, error: false, data: message.payload };
    }

    if (message.type === 'GET_PROJECTS_RESULT_FAILED_ACTION') {
        return { ...state, error: message.payload, data: null };
    }

    return state;
}

export {
    projectsReducer as default,
};
