const initialState = {
    error: false,
    data: null,
};

function contentReducer(state: any = initialState, message: any): any {
    if (message.type === 'GET_CONTENT_REQUEST_ACTION') {
        return { ...state, error: false, data: null };
    }

    if (message.type === 'GET_CONTENT_RESULT_SUCCESS_ACTION') {
        return { ...state, error: false, data: message.payload };
    }

    if (message.type === 'GET_CONTENT_RESULT_FAILED_ACTION') {
        return { ...state, error: message.payload, data: null };
    }

    return state;
}

export {
    contentReducer as default,
};
