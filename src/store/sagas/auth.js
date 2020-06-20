import { put, select, takeLatest } from 'redux-saga/effects';
import * as authConstants from 'store/constants/auth';
import * as authActions from 'store/actions/auth';
import * as authSelectors from 'store/selectors/auth';
// import * as RootNavigation from 'navigation/RootNavigation';
import { GoogleSignin } from '@react-native-community/google-signin';
import { LoginManager } from 'react-native-fbsdk';
import { loginMethods } from 'store/constants/auth';


function* handleLoginSuccess() {
    console.log('success!');
}

GoogleSignin.configure();

const googleSignOut = async () => {
    try {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
    } catch (error) {
        console.log('saga error', error);
        console.error(error);
        throw new Error(error);
    }
};

function* handleLogout() {
    try {
        const loginMethod = yield select(authSelectors.loginMethodSelector);
        if(loginMethod === loginMethods.GOOGLE) {
            yield googleSignOut();
        } else if(loginMethod === loginMethods.FACEBOOK) {
            const loggedOut = yield LoginManager.logOut();
            LoginManager.getLoginBehavior()
            console.log({loggedOut });
        }
        yield put(authActions.logoutSuccess());
    } catch (e) {
        yield put(authActions.logoutFailed(e));
    }
}

function* authSaga() {
    yield takeLatest(authConstants.LOGIN_SUCCESS, handleLoginSuccess);
    yield takeLatest(authConstants.LOGOUT, handleLogout);
}

export default authSaga;
