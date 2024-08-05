import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Image, ScrollView } from 'react-native';

const CategoryHeader = ({ onBack }) => {
    const [selectedOption, setSelectedOption] = useState('건물별');
    const [selectedBuilding, setSelectedBuilding] = useState('건물 1');
    const [selectedCategory, setSelectedCategory] = useState('종류 1');
    const buildingNames = ['건물 1', '건물 2', '건물 3', '건물 4', '건물 5', '건물 6'];
    const categoryNames = ['종류 1', '종류 2', '종류 3', '종류 4', '종류 5', '종류 6'];

    const renderStores = () => {
        const names = selectedOption === '건물별' ? buildingNames : categoryNames;
        const selected = selectedOption === '건물별' ? selectedBuilding : selectedCategory;
        const setSelected = selectedOption === '건물별' ? setSelectedBuilding : setSelectedCategory;

        return names.map((name, index) => (
            <TouchableOpacity
                key={index}
                style={[
                    styles.store,
                    selected === name && styles.selectedStore,
                ]}
                onPress={() => setSelected(name)}
            >
                <Image style={styles.storeImage} source={require('../assets/logo.png')} />
                <Text>{name}</Text>
            </TouchableOpacity>
        ));
    };

    return (
        <View style={styles.view}>
            <Text style={styles.logotext}>교내매장</Text>
            <View style={styles.toggleContainer}>
                <TouchableOpacity
                    style={[
                        styles.toggleButton,
                        selectedOption === '건물별' && styles.selectedButton,
                    ]}
                    onPress={() => setSelectedOption('건물별')}
                >
                    <Text
                        style={[
                            styles.toggleButtonText,
                            selectedOption === '건물별' && styles.selectedButtonText,
                        ]}
                    >
                        건물별
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.toggleButton,
                        selectedOption === '종류별' && styles.selectedButton,
                    ]}
                    onPress={() => setSelectedOption('종류별')}
                >
                    <Text
                        style={[
                            styles.toggleButtonText,
                            selectedOption === '종류별' && styles.selectedButtonText,
                        ]}
                    >
                        종류별
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonview}>
                <TouchableOpacity>
                    <Text style={styles.searchButton}>🔍</Text>
                </TouchableOpacity>
            </View>
            <ScrollView
                horizontal={true}
                style={styles.storesSection}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.storeRow}
            >
                {renderStores()}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        height: 240,
        paddingTop: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        borderBlockColor: '#000',
        borderBottomWidth: 1
    },
    buttonview: {
        position: 'absolute',
        right: 10,
        bottom: 100,
    },
    logotext: {
        position: 'absolute',
        left: 10,
        bottom: 140,
        fontSize: 20,
        fontWeight: '700',
        color: '#000',
    },
    toggleContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 90,
        width: 330,
        left: 10,
    },
    toggleButton: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: '#007AFF',
        backgroundColor: '#fff',
    },
    selectedButton: {
        backgroundColor: '#007AFF',
    },
    toggleButtonText: {
        color: '#007AFF',
        textAlign: 'center',
    },
    selectedButtonText: {
        color: '#fff',
    },
    searchButton: {
        fontSize: 18,
        color: '#fff',
    },
    storesSection: {
        marginTop: 130
    },
    storeRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingRight: 20, // 마지막 요소까지 스크롤할 수 있도록 패딩 추가
    },
    store: {
        width: 80, // 고정 너비를 사용하여 스크롤 문제 해결
        alignItems: 'center',
        padding: 10,
        marginRight: 10,
        borderWidth: 2, // 미리 border 공간 확보
        borderColor: 'transparent', // 기본 투명 border
        borderRadius: 5,
    },
    selectedStore: {
        borderColor: '#007AFF', // 선택되었을 때 border 색 변경
    },
    storeImage: {
        width: 50,
        height: 50,
        backgroundColor: '#ccc',
        marginBottom: 5
    },
});

export default CategoryHeader;
