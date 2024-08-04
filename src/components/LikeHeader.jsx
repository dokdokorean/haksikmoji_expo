import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet, Pressable, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SigninHeader = ({ onBack }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.view}>
            <Text style={styles.logotext}>내 즐겨찾기</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        height: 90,
        paddingTop: 1,
        backgroundColor: 'rgba(0, 0, 0)', // Black background with 50% opacity
        flexDirection: 'row',
    },
    buttonview: {
        flexDirection: 'row',
        position: 'absolute',
        right: 10,
        bottom: 10,
    },
    logotext: {
        position: 'absolute',
        left: 10,
        bottom: 0,
        fontSize: 20,
        fontWeight: 700
    }
});

export default SigninHeader;

