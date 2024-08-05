import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Button, ScrollView, TouchableOpacity, StyleSheet, Image, Platform } from 'react-native';
import { format, startOfWeek, addDays } from 'date-fns';
import MainHeader from '../components/MainHeader';
import { BASE_URL } from '../service/Api';
import axios from 'axios';

const Home = ({ navigation }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [weekDays, setWeekDays] = useState([]);
    const [menuList, setMenuList] = useState([]);

    useEffect(() => {
        updateWeekDays(selectedDate);
        getMenuForDay(selectedDate);
    }, [selectedDate]);

    const updateWeekDays = (date) => {
        const start = startOfWeek(date, { weekStartsOn: 0 });
        const days = Array.from({ length: 7 }, (_, i) => addDays(start, i));
        setWeekDays(days);
    };

    const handleDayPress = (day) => {
        setSelectedDate(day);
        getMenuForDay(day);
    };

    const getCurrentDate = () => {
        const date = new Date();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const weekDay = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'][date.getDay()];

        return `${month}월 ${day}일 ${weekDay}`;
    };

    const getMenuForDay = async (date) => {
        const dayOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][date.getDay()];
        try {
            const request = await axios.get(`${BASE_URL}/api/haksik`);
            const response = await request.data;
            const data = await response.body;

            setMenuList(data.menu[dayOfWeek] || []);
        } catch (error) {
            console.error('Error fetching records:', error);
        }
    };

    const StoreDetail = () => {
        navigation.navigate('GeneralStore');
    };

    const welcomeMessages = [
        '오늘도 화이팅이에요!',
        '조금만 버티면 주말이에요!',
        '중간고사 화이팅하세요!',
        '밥은 먹고 다니니..?'
    ];

    const getRandomMessage = () => {
        const randomIndex = Math.floor(Math.random() * welcomeMessages.length);
        return welcomeMessages[randomIndex];
    };

    return (
        <View style={styles.container}>
            <MainHeader />
            <ScrollView style={styles.main} showsVerticalScrollIndicator={false}>
                <Text style={styles.welcomeMessages}>{getRandomMessage()}</Text>
                <Text style={styles.date}>{getCurrentDate()}</Text>

                <View style={styles.cafeteriaSection}>
                    <View style={styles.cafeteriaStatus}>
                        <Text style={styles.sectionTitle}>카페테리아 현</Text>
                        <View style={styles.weekContainer}>
                            {weekDays.map((day, index) => (
                                <TouchableOpacity key={index} onPress={() => handleDayPress(day)}>
                                    <Text
                                        style={[
                                            styles.weekDayText,
                                            format(day, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd') && styles.selectedDayText,
                                        ]}
                                    >
                                        {format(day, 'd')}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <View>
                            {menuList.length > 0 ? (
                                menuList.map((menu, index) => (
                                    <Text key={index} style={styles.menuList}>{menu}</Text>
                                ))
                            ) : (
                                <Text style={styles.menuList}>메뉴가 없습니다.</Text>
                            )}
                        </View>
                        <Button title="자세히 보기 >" onPress={StoreDetail} />
                    </View>
                    <Text style={styles.notice}>메뉴가 정확하지 않을 수 있습니다. {'\n'}매장 상세페이지에 들어가면 사장님께 문의를 넣을 수 있어요.</Text>
                </View>
                <Text style={styles.sectionTitle}>즐겨찾는 매장</Text>
                <ScrollView horizontal={true} style={styles.storesSection} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.storeRow}>
                    {[1, 2, 3, 4].map((_, index) => (
                        <View key={index} style={styles.store}>
                            <Image style={styles.storeImage} source={require('../assets/logo.png')} />
                            <Text>매장 이름</Text>
                            <Text>현재 운영 여부</Text>
                        </View>
                    ))}
                </ScrollView>
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
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    welcomeMessages: {
        fontWeight: '600',
        fontSize: 20,
        marginBottom: 10
    },
    main: {
        padding: 20
    },
    date: {
        fontSize: 18,
        marginBottom: 10
    },
    cafeteriaSection: {
        marginBottom: 20
    },
    sectionTitle: {
        fontSize: 20,
        marginBottom: 10
    },
    cafeteriaStatus: {
        backgroundColor: '#ddd',
        padding: 10,
        borderRadius: 5
    },
    menuList: {
        marginVertical: 10
    },
    notice: {
        marginTop: 10,
        fontSize: 12,
        color: 'gray'
    },
    storesSection: {
        marginBottom: 20
    },
    storeRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingRight: 20, // 마지막 요소까지 스크롤할 수 있도록 패딩 추가
    },
    store: {
        width: 120, // 고정 너비를 사용하여 스크롤 문제 해결
        alignItems: 'center',
        marginRight: 10
    },
    storeImage: {
        width: 100,
        height: 100,
        backgroundColor: '#ccc',
        marginBottom: 5
    },
    couponsSection: {
        marginBottom: 100
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
    weekContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 16,
        height: 10,
    },
    weekDayText: {
        fontSize: 16,
        color: '#000',
        height: 30,
    },
    selectedDayText: {
        color: '#84A2BB',
        borderRadius: 10,
        paddingVertical: 10,
        top: -9.5,
    },
    qrcode: {
        width: 70,
        height: 70
    }
});

export default Home;
