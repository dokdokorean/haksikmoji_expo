import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet, Pressable, ImageBackground,View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SigninHeader = ({ }) => {
    const navigation = useNavigation();
    return (
        <View style={styles.view}>
            <ImageBackground
                style={{ width: "100%", height: "100%" , resizeMode:'contain'}}  //View를 꽉채우도록
                source={require("../assets/logo.png")}  //이미지경로
                >
                    <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Image
                            source={require('../assets/back.png')}
                            style={styles.image}
                        />
                    </Pressable>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        height: 270,
        paddingTop: 1,
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
    },
    infoIcon: {
        width: 20,
        height: 20,
    },
    backButton: {
        position: 'absolute',
        marginLeft: '7%',
        marginTop: '16%',
    },
    image: {
        width: 30,
        height: 20,
        resizeMode: 'contain',
    },
});

export default SigninHeader;

