import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet, Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SigninHeader = ({ onBack }) => {
    const navigation = useNavigation();
    return (
        <View style={styles.view}>
            <Pressable style={styles.backButton} onPress={onBack}>
                <Image
                    source={require('../assets/back.png')}
                    style={styles.image}
                />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        height: 120,
        paddingTop: 1,
    },
    infoButton: {
        position: 'absolute',
        top: 60,
        right: 10,
    },
    infoIcon: {
        width: 20,
        height: 20,
    },
    backButton: {
        position: 'absolute',
        marginLeft:20,
        bottom:30
    },
    image: {
        width: 28,
        height: 28,
        resizeMode: 'contain',
    },
    headment1: {
        position: 'absolute',
        fontWeight: '700',
        marginTop: '0%',
        width: 200,
        left: 40,
        fontSize: 20,
    },
});

export default SigninHeader;

