import React, { useEffect, useCallback } from 'react';
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { isMountedRef, navigationRef } from "./RootNavigation";
import styled from "styled-components/native/dist/styled-components.native.esm";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import * as authSelectors from "store/selectors/auth";
// screens
import LoginScreen from "screens/loginScreen";
import HomeScreen from "screens/homeScreen";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const StyledButton = styled.Button`
  width: 80%;
  height: 200px;
`;

function DetailsScreen({ navigation }) {
    return (
        <Container>
            <Text>Details Screen</Text>
            <StyledButton
                title={ 'Pop to top' }
                onPress={ navigation.popToTop }
            />
        </Container>
    );
}

const Stack = createStackNavigator();

const AppNavigator = () => {
    useEffect(() => {
        isMountedRef.current = true;
        
        return () => (isMountedRef.current = false);
    }, []);
    const username = useSelector(authSelectors.usernameSelector);
    console.log({ username });
    return (
        <NavigationContainer ref={ navigationRef }>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={ {
                    headerStyle: {
                        backgroundColor: '#f4511e',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                } }
            >{ username ?
                <>
                    <Stack.Screen
                        name="Home"
                        component={ HomeScreen }
                        options={ { title: 'Overview' } }/>
                    <Stack.Screen
                        name="Details"
                        component={ DetailsScreen }
                        options={ { title: 'DetailsScreen' } }/>
                </>
                :
                <Stack.Screen
                    name="LoginScreen"
                    component={ LoginScreen }
                    options={ { headerShown: false } }/>
            }
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator;
