import * as authConstants from 'store/constants/auth';

const initialState = {
    username: '',
    profileImageUrl: '',
    loginMethod: '', // google / facebook
    error: false,
    loading: false,
};

const authReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case authConstants.LOGOUT:
            return {
                ...state,
                loading: true
            };
        case authConstants.LOGOUT_SUCCESS:
            return initialState
        case authConstants.LOGIN_SUCCESS:
            return {
                ...state,
                username: payload.username,
                profileImageUrl: payload.profileImageUrl,
                loginMethod: payload.loginMethod,
                loading: false
            }
        case authConstants.LOGOUT_FAILED:
            return {
                ...state,
                loading: false,
                error: payload
            }
        default:
            return state;
    }
}

export default authReducer;
