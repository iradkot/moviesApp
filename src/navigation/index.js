import React, { useEffect } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { isMountedRef, navigationRef } from "./RootNavigation";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import * as authSelectors from "store/selectors/auth.selectors";
// screens
import LoginScreen from "screens/loginScreen";
import HomeScreen from "screens/homeScreen";
import MovieDetailsScreen from 'screens/movieDetailsScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
    useEffect(() => {
        isMountedRef.current = true;
        
        return () => (isMountedRef.current = false);
    }, []);
    const username = useSelector(authSelectors.usernameSelector);
    return (
        <NavigationContainer ref={ navigationRef }>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={ { headerShown: false } }
            >{ username ?
                <>
                    <Stack.Screen
                        name="Home"
                        component={ HomeScreen }
                        />
                    <Stack.Screen
                        name="Details"
                        component={ MovieDetailsScreen }
                        />
                </>
                :
                <Stack.Screen
                    name="LoginScreen"
                    component={ LoginScreen }
                    />
            }
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator;
