import React, { useState } from "react";
import { TouchableOpacity, TextInput, StyleSheet, Text, View, Image, Alert } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Login = ({ navigation }) => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={styles.container}
            resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled={true}
        >
            <Image
                source={require('../assets/logo.png')}
                style={styles.logo}
                onError={(error) => {
                    console.error('Image load error:', error);
                    Alert.alert('Image Load Error', 'Failed to load the logo image.');
                }}
            />
            <Text style={styles.titleText}>로그인</Text>
            <TextInput
                style={styles.input}
                placeholder="아이디 입력"
                value={id}
                onChangeText={setId}
            />
            <TextInput
                style={styles.input}
                placeholder="비밀번호 입력"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <View style={styles.row}>
                {/* 필요한 경우 여기에 추가할 내용 */}
            </View>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>로그인</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={styles.signupText}>회원가입하기</Text>
            </TouchableOpacity>
        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
        backgroundColor: '#fff',
    },
    logo: {
        width: 180,
        height: 100, // 높이 추가
        resizeMode: 'contain',
        marginTop: 20, // 여백 감소
        marginBottom: 20, // 여백 감소
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 50,
        width: '100%',
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
    },
    button: {
        height: 50,
        width: '100%',
        backgroundColor: '#84A2BB',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    signupText: {
        color: '#000',
    },
});

export default Login;