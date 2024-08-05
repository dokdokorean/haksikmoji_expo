import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Switch, Button } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import MyinfoHeader from '../components/MyinfoHeader';

const Myinfo = ({ navigation }) => {
    const storeNames = ['매장 1', '매장 2', '매장 3', '매장 4', '매장 5', '매장 6', '매장 7', '매장 8'];
    const [isEnabled1, setIsEnabled1] = useState(false);
    const [isEnabled2, setIsEnabled2] = useState(false);
    const [isEnabled3, setIsEnabled3] = useState(false);

    const toggleSwitch1 = () => {
        setIsEnabled1(previousState => !previousState);
    };
    const toggleSwitch2 = () => {
        setIsEnabled2(previousState => !previousState);
    };
    const toggleSwitch3 = () => {
        setIsEnabled3(previousState => !previousState);
    };

    const logout = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [
                    { name: 'Login' },
                ],
            })
        );
    };

    return (
        <View style={styles.container}>
            <MyinfoHeader />
            <ScrollView style={styles.storesSection} showsVerticalScrollIndicator={false} contentContainerStyle={styles.storeRow}>
                <View style={styles.myinfo}>
                    <Image style={styles.profileImage} source={require('../assets/logo.png')} />
                    <View style={styles.myinfoDetails}>
                        <Text>연세대학교(미래) 재학생</Text>
                        <Text>배진우</Text>
                        <Text>인증완료</Text>
                        <Text>gravity0225@yonsei.ac.kr</Text>
                    </View>
                </View>
                <View style={styles.couponsSection}>
                    <Text style={styles.sectionTitle}>쿠폰</Text>
                    <View style={styles.coupon}>
                        <Text>쿠폰 제목</Text>
                        <View style={styles.couponDetails}>
                            <Image style={styles.qrcode} source={require('../assets/logo.png')} />
                            <Text>사용처</Text>
                            <Text>가격</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.pushSection}>
                    <Text style={styles.sectionTitle}>푸시 알림 관리</Text>
                    <View style={styles.notificationSwitch}>
                        <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={isEnabled1 ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch1}
                            value={isEnabled1}
                        />
                        <Text>일일 메뉴 푸시 알림(오전 8시)</Text>
                    </View>
                    <View style={styles.notificationSwitch}>
                        <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={isEnabled2 ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch2}
                            value={isEnabled2}
                        />
                        <Text>즐겨찾기 매장 공지사항 푸시 알림(오전 8시)</Text>
                    </View>
                    <View style={styles.notificationSwitch}>
                        <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={isEnabled3 ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch3}
                            value={isEnabled3}
                        />
                        <Text>쿠폰 등록 알림(상시)</Text>
                    </View>
                </View>
                <View style={styles.people}>
                    <Text>개발진 & 문의처</Text>
                    <View style={styles.myinfoDetails}>
                        <Text>배진우 - gravity0225@yonsei.ac.kr</Text>
                        <Text>진기원</Text>
                        <Text>우명규</Text>
                        <Text>손찬우</Text>
                    </View>
                    <Button title='로그아웃' onPress={logout} />
                    <Button title='회원탈퇴' />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    storesSection: {
        marginTop: 20,
        padding: 5
    },
    storeRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 10, // Add padding for better spacing
    },
    store: {
        width: '48%', // Two items per row with some margin
        alignItems: 'center',
        marginBottom: 20,
    },
    storeImage: {
        width: 150,
        height: 150,
        backgroundColor: '#ccc',
        marginBottom: 5
    },
    pushSection: {
        marginBottom: 20
    },
    myinfo: {
        width: '100%',
        flexDirection: 'row',
        marginVertical: 20
    },
    myinfoDetails: {
        marginLeft: 20
    },
    profileImage: {
        width: 70,
        height: 70,
        borderRadius: 20
    },
    couponsSection: {
        marginBottom: 50,
        width: '100%'
    },
    coupon: {
        backgroundColor: '#ddd',
        padding: 10,
        borderRadius: 5
    },
    couponDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    qrcode: {
        width: 70,
        height: 70
    },
    notificationSwitch: {
        flexDirection: 'row',
        marginBottom: 20
    },
});

export default Myinfo;
