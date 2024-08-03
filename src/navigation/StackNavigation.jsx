import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../login/Login';
import Signin from '../login/Signin'
import SignatureInput from '../login/SignatureInput';

const Stack = createStackNavigator();

const StackNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Signin"
                component={Signin}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SignatureInput"
                component={SignatureInput}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};

export default StackNavigation;