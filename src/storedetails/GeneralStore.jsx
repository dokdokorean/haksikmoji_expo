import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import StoreHeader from '../components/StoreHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';


const GeneralStore = () => {
    const [selectedTab, setSelectedTab] = useState('menu');
    const [OperationTimeToggle,setOpertationTimeToggle] = useState(false)

    const renderContent = () => {
        if (selectedTab === 'menu') {
            return (
                <View style={styles.menuSection}>
                    <Text style={styles.menuCategory}>치밥 메뉴</Text>
                    {menuItems.map((item, index) => (
                        <View key={index} style={styles.menuItem}>
                            <Image source={require('../assets/logo.png')} style={styles.menuImage} />
                            <View style={styles.menuDetails}>
                                <Text style={styles.menuTitle}>{item.title}</Text>
                                <Text style={styles.menuPrice}>단품: {item.priceSingle}원</Text>
                                <Text style={styles.menuPrice}>세트: {item.priceSet}원</Text>
                            </View>
                        </View>
                    ))}
                    <Text style={styles.menuCategory}>치킨</Text>
                    {chickenItems.map((item, index) => (
                        <View key={index} style={styles.menuItem}>
                            <Image source={require('../assets/logo.png')} style={styles.menuImage} />
                            <View style={styles.menuDetails}>
                                <Text style={styles.menuTitle}>{item.title}</Text>
                                <Text style={styles.menuPrice}>단품: {item.priceSingle}원</Text>
                                <Text style={styles.menuPrice}>세트: {item.priceSet}원</Text>
                            </View>
                        </View>
                    ))}
                </View>
            );
        } else {
            return (
                <View style={styles.notificationSection}>
                    <Text style={styles.notificationText}>공지사항</Text>
                </View>
            );
        }
    };
    const fetchOperationTime = () => {
        return ['9:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '12:00 - 13:00', '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00'];
    };

    const times = fetchOperationTime();

    const OperationTime = [
        { label: '일요일 ' + times[0], value: '0' },
        { label: '월요일 ' + times[1], value: '1' },
        { label: '화요일 ' + times[2], value: '2' },
        { label: '수요일 ' + times[3], value: '3' },
        { label: '목요일 ' + times[4], value: '4' },
        { label: '금요일 ' + times[5], value: '5' },
        { label: '토요일 ' + times[6], value: '6' },
    ];

    const RenderOperationTime = () => {
        const [isVisible, setIsVisible] = useState(false);

        const today = new Date();
        const todayIndex = today.getDay(); // 0 (일요일)부터 6 (토요일)까지의 값 반환
        const todayOperation = OperationTime[todayIndex];

        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.toggleButton}
                    onPress={() => setIsVisible(!isVisible)}
                >
                    <Text style={styles.toggleButtonText}>
                        {`${todayOperation.label.split(' ')[0]} ${todayOperation.label.split(' ')[1]} ${todayOperation.label.split(' ')[2]} ${todayOperation.label.split(' ')[3]}`}
                    </Text>
                    <AntDesign
                        style={{ transform: [{ rotate: isVisible ? '180deg' : '0deg' }], marginLeft: 8 }}
                        color={'#111111'}
                        name="down"
                        size={15}
                    />
                </TouchableOpacity>
                {isVisible && (
                    <View style={styles.infoContainer}>
                        {OperationTime.map(item => (
                            <Text key={item.value} style={[styles.infoText, item.value == todayIndex.toString() && styles.boldText]}>
                                {item.label}
                            </Text>
                        ))}
                    </View>
                )}
            </View>
        );
    };
    
    return (
        <ScrollView style={styles.container}>
            <StoreHeader/>
            <View style={styles.infoSection}>
                <Text style={styles.title}>학생식당</Text>
                <Text style={styles.subTitle}>BNC</Text>
                <Text style={styles.openStatus}>영업중</Text>
                <Text style={styles.notice}>❗금일 영업시간 변경 안내❗</Text>
                <Text style={styles.infoText}>전화: 033-760-5154</Text>
                <Text style={styles.infoText}>위치: 연세플라자 2F</Text>
                <View style={styles.OperationTime}>
                    <Text style={[styles.infoText,{marginRight:10}]}>운영시간:</Text>
                    {RenderOperationTime()}
                </View>
            </View>
            <View style={styles.tabSection}>
                <TouchableOpacity onPress={() => setSelectedTab('menu')}>
                    <Text style={[styles.tab, selectedTab === 'menu' && styles.tabActive]}>메뉴</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedTab('notification')}>
                    <Text style={[styles.tab, selectedTab === 'notification' && styles.tabActive]}>공지사항</Text>
                </TouchableOpacity>
            </View>
            {renderContent()}
        </ScrollView>
    );
};

const menuItems = [
    { title: '오리지날 통살 치킨마요', priceSingle: '5,900', priceSet: '7,500' },
    { title: '오코노미 통살 치킨마요', priceSingle: '5,900', priceSet: '7,500' },
    { title: '양념 통살 치킨마요', priceSingle: '5,900', priceSet: '7,500' },
    { title: '간장 양념 통살 치킨마요', priceSingle: '5,900', priceSet: '7,500' },
];

const chickenItems = [
    { title: '크리스피 치킨', priceSingle: '13,000', priceSet: '7,500' },
    { title: '칭따오 치킨', priceSingle: '15,000', priceSet: '8,500' },
    { title: '양념 치킨', priceSingle: '14,000', priceSet: '8,500' },
    { title: '파닭 치킨', priceSingle: '15,000', priceSet: '8,500' },
];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerImage: {
        width: '100%',
        height: 200,
    },
    infoSection: {
        padding: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    subTitle: {
        fontSize: 16,
        color: '#333',
    },
    openStatus: {
        fontSize: 16,
        color: 'green',
        marginVertical: 5,
    },
    notice: {
        fontSize: 16,
        color: 'red',
        marginVertical: 5,
    },
    infoText: {
        fontSize: 14,
        color: '#555',
        marginVertical: 2,
    },
    tabSection: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    tab: {
        fontSize: 16,
        paddingVertical: 10,
        color: '#aaa',
    },
    tabActive: {
        color: 'black',
        borderBottomWidth: 2,
        borderBottomColor: 'black',
    },
    menuSection: {
        padding: 20,
    },
    menuCategory: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    menuItem: {
        flexDirection: 'row',
        marginVertical: 10,
        alignItems: 'center',
    },
    menuImage: {
        width: 70,
        height: 70,
        marginRight: 10,
    },
    menuDetails: {
        flex: 1,
    },
    menuTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    menuPrice: {
        fontSize: 14,
        color: '#555',
    },
    notificationSection: {
        padding: 20,
    },
    notificationText: {
        fontSize: 16,
        color: '#333',
    },
    OperationTime:{
        flexDirection:'row'
    },
    dropdown:{
        borderWidth: 1,
        width:100,
        borderColor: '#fff',
        marginHorizontal: 0,
        marginVertical: 10,
        height: 26,
        borderRadius: 12
    },
    toggleButton: {
        flexDirection: 'row',
    },
    toggleButtonText: {
        fontSize: 16,
        color: '#111111',
    },
    infoContainer: {
        marginTop: 3,

    },
    infoText: {
        fontSize: 14,
        color: '#333333',
        marginBottom: 5,
    },
    boldText: {
        fontWeight: 'bold',
    },
});

export default GeneralStore;
