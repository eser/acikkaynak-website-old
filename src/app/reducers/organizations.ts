const initialState = {
    error: false,
    data: null,
};

function organizationsReducer(state: any = initialState, message: any): any {
    if (message.type === 'GET_ORGANIZATIONS_REQUEST_ACTION') {
        return { ...state, error: false, data: null };
    }

    if (message.type === 'GET_ORGANIZATIONS_RESULT_SUCCESS_ACTION') {
        return { ...state, error: false, data: message.payload };
    }

    if (message.type === 'GET_ORGANIZATIONS_RESULT_FAILED_ACTION') {
        return { ...state, error: message.payload, data: null };
    }

    return state;
}

export {
    organizationsReducer as default,
};
