import * as authConstants from '../constants/auth';

const initialState = {
    token: false,
    error: false,
    loading: false,
};

const authReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case authConstants.GET_TOKEN:
            return { ...state, loading: true }
        default:
            return state;
    }
}

export default authReducer;
