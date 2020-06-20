import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import IconButton from 'components/buttons/IconButton';
import * as authActions from 'store/actions/auth.actions';
import { loginMethods } from 'store/constants/auth.constants';

import { GoogleSignin, statusCodes, } from '@react-native-community/google-signin';
import config from 'config';

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
            console.log({ userInfo });
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
        setTimeout(async () => {
            console.log('now!');
            // signIn();
            await GoogleSignin.configure({
                webClientId: config.GOOGLE_WEB_CLIENT_ID,
                offlineAccess: true,
            });
        }, 2000);
    }, []);
    
    return (
        <IconButton backgroundColor={ buttonBackground } onPress={ signIn } iconName={ 'google' }>
            Login with Google
        </IconButton>
    );
};

export default GoogleButton;
