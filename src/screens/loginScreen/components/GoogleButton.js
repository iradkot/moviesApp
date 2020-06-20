import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import IconButton from 'components/buttons/IconButton';
import * as authActions from 'store/actions/auth';
import { loginMethods } from 'store/constants/auth';

import { GoogleSignin, statusCodes, } from '@react-native-community/google-signin';

// GoogleSignin.configure({
//     // scopes: ['https://www.googleapis.com/auth/drive.readonly'],
//     webClientId: '1000272866334-0mrti0kumfvp4vvaq9mn4ngusput0pbh.apps.googleusercontent.com',
//     offlineAccess: true,
//     forceCodeForRefreshToken: true
// });

GoogleSignin.configure({
    webClientId: '1000272866334-tk46i8ci29b713l6n8cg73chq4qk0qcm.apps.googleusercontent.com',
    offlineAccess: true,
    forceCodeForRefreshToken: true
});

const buttonBackground = "#cf0028"
const GoogleButton = ({ onPress }) => {
    const dispatch = useDispatch();
    const loginSuccess = useCallback(
        ({ user: { name, photo } }) => {
            dispatch(authActions.loginSuccess({
                username: name,
                profileImageUrl: photo,
                loginMethod: loginMethods.GOOGLE,
            }))
        },
        [ dispatch ],
    );
    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            loginSuccess(userInfo)
        } catch (error) {
            console.log({ error });
            if ( error.code === statusCodes.SIGN_IN_CANCELLED ) {
                // user cancelled the login flow
            } else if ( error.code === statusCodes.IN_PROGRESS ) {
                // operation (e.g. sign in) is in progress already
            } else if ( error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE ) {
                // play services not available or outdated
                console.log('Google login error', 'play services not available or outdated');
            } else {
                // some other error happened
                console.log(error);
                console.log(error.toString());
                console.log('Google login error', 'Unknown error, contact support');
            }
        }
    };
    useEffect(() => {
        setTimeout(() => {
            console.log('now!');
            signIn();
        }, 2000);
    }, []);
    
    return (
        <IconButton backgroundColor={ buttonBackground } onPress={ signIn } iconName={ 'google' }>
            Login with Google
        </IconButton>
    );
};

export default GoogleButton;
