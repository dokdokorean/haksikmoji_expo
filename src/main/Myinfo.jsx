import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import MyinfoHeader from '../components/MyinfoHeader'

const Myinfo = ({ navigation }) => {
    const storeNames = ['매장 1', '매장 2', '매장 3', '매장 4', '매장 5', '매장 6', '매장 7', '매장 8'];
    return (
        <View style={styles.container}>
            <MyinfoHeader/>
            <ScrollView style={styles.storesSection} showsVerticalScrollIndicator={false} contentContainerStyle={styles.storeRow}>
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
});

export default Myinfo;
