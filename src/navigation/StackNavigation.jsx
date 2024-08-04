import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../login/Login';
import Signin from '../login/Signin'
import SignatureInput from '../login/SignatureInput';
import Home from '../main/Home'
import TabNavigation from './TabNavigation';
import Category from '../main/Category';
import Like from '../main/Like';
import Myinfo from '../main/Myinfo';

const Stack = createStackNavigator();

const StackNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="TabNavigation">
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
            <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="TabNavigation"
                component={TabNavigation}
                options={{ headerShown: false, gestureEnabled: false }}
            />
            <Stack.Screen
                name="Category"
                component={Category}
                options={{ headerShown: false, gestureEnabled: false }}
            />
            <Stack.Screen
                name="Like"
                component={Like}
                options={{ headerShown: false, gestureEnabled: false }}
            />
            <Stack.Screen
                name="Myinfo"
                component={Myinfo}
                options={{ headerShown: false, gestureEnabled: false }}
            />
        </Stack.Navigator>
    );
};

export default StackNavigation;