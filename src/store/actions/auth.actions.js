import * as authConstants from 'store/constants/auth.constants';

export const getToken = (payload) => ({
        type: authConstants.GET_TOKEN,
        payload
});

export const loginSuccess = payload => ({
    type: authConstants.LOGIN_SUCCESS,
    payload
})

export const logout = () => ({
    type: authConstants.LOGOUT
});
export const logoutSuccess = () => ({
    type: authConstants.LOGOUT_SUCCESS
});
export const logoutFailed = error => ({
    type: authConstants.LOGOUT_FAILED,
    payload: error
});
