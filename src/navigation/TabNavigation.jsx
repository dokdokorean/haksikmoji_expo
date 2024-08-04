import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../main/Home';
import Category from '../main/Category';
import Like from '../main/Like';
import Myinfo from '../main/Myinfo';

const Tab = createBottomTabNavigator();

const CustomTabIcon = ({ source, focused }) => {
    return (
        <View style={styles.iconContainer}>
            <Image
                source={source}
                style={[
                    styles.icon,
                    { tintColor: focused ? '#84A2BB' : '#BDBDBD' },
                ]}
                resizeMode="contain"
            />
            {focused && <View style={styles.dot} />}
        </View>
    );
};

const TabNavigation = () => {
    return (
        <Tab.Navigator
            initialRouteName="CalenderMain"
            screenOptions={{
                tabBarActiveTintColor: '#84A2BB',
                tabBarInactiveTintColor: '#BDBDBD',
                tabBarStyle: [{ display: 'flex' }, null],
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: '홈',
                    tabBarIcon: ({ focused }) => (
                        <CustomTabIcon
                            source={require('../assets/logo.png')}
                            focused={focused}
                        />
                    ),
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Category"
                component={Category}
                options={{
                    tabBarLabel: '카테고리',
                    tabBarIcon: ({ focused }) => (
                        <CustomTabIcon
                            source={require('../assets/logo.png')}
                            focused={focused}
                        />
                    ),
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Like"
                component={Like}
                options={{
                    tabBarLabel: '즐겨찾기',
                    tabBarIcon: ({ focused }) => (
                        <CustomTabIcon
                            source={require('../assets/logo.png')}
                            focused={focused}
                        />
                    ),
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Myinfo"
                component={Myinfo}
                options={{
                    tabBarLabel: '내 정보',
                    tabBarIcon: ({ focused }) => (
                        <CustomTabIcon
                            source={require('../assets/logo.png')}
                            focused={focused}
                        />
                    ),
                    headerShown: false,
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 22,
        height: 22,
    },
    icon: {
        width: '100%',
        height: '100%',
    },
    dot: {
        width: 25,
        height: 3,
        backgroundColor: '#84A2BB',
        borderRadius: 3,
        position: 'absolute',
        top: -10,
    },
});

export default TabNavigation;
