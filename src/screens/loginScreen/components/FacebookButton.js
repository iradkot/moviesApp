import React, { useCallback } from 'react';
import IconButton from 'components/buttons/IconButton';
import { GraphRequest, GraphRequestManager, LoginManager } from 'react-native-fbsdk';
import { useDispatch } from 'react-redux';
import * as authActions from 'store/actions/auth.actions';
import { loginMethods } from 'store/constants/auth.constants';

const buttonBackground = '#3b5998';
const FacebookButton = () => {
    const dispatch = useDispatch();
    const loginSuccess = useCallback(
        ({ user: { name, photo } }) => {
            dispatch(authActions.loginSuccess({
                username: name,
                profileImageUrl: photo,
                loginMethod: loginMethods.FACEBOOK,
            }))
        },
        [ dispatch ],
    );
    
    const handleProfileDataGather = useCallback((error, result) => {
        if ( error ) {
            console.log('handleProfileDataGather', { error });
        } else {
            loginSuccess({ user: { name: result.name, photo: result.picture.data.url } });
        }
    }, []);
    console.log(' in facebook button!')
    const handleLogin = useCallback(
        () => {
            // LoginManager.logOut();
            // Attempt a login using the Facebook login dialog asking for default permissions.
            LoginManager.logInWithPermissions([ 'public_profile' ]).then(
                function (result) {
                    console.log({ result });
                    if ( result.isCancelled ) {
                        console.log('Login cancelled');
                    } else {
                        console.log('Login success with permissions: ', result.grantedPermissions.toString(), result.grantedPermissions);
                        // Create a graph request asking for user information with a callback to handle the response.
                        const infoRequest = new GraphRequest(
                            '/me?fields=picture,name',
                            null,
                            handleProfileDataGather,
                        );
                        console.log('requesting data?')
                        // Start the graph request.
                        new GraphRequestManager().addRequest(infoRequest).start();
                    }
                },
                function (error) {
                    console.log('Login fail with error: ' + error);
                }
            );
        },
        [],
    );
    
    return (
        <IconButton backgroundColor={ buttonBackground } onPress={ handleLogin } iconName={ 'facebook' }>
            Login with Facebook
        </IconButton>
    );
};

export default FacebookButton;
