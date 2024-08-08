import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchHeader from '../components/SearchHeader';
import { useRoute } from '@react-navigation/native';


const SearchResult = () => {
    const [ searchResultText , setsearchResultText] = useState()
    const searchInputRef = useRef(null);
    const route = useRoute();
    const { searchText } = route.params;

    useEffect(() => {
        setsearchResultText(searchText)
    },[])
    const handleSearch = async () => {
    };


    return (
        <View style={styles.container}>
            <SearchHeader />
            <TextInput
                ref={searchInputRef}
                style={styles.searchInput}
                value={searchResultText}
                onChangeText={setsearchResultText}
                placeholder="Search..."
            />
            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>
            <ScrollView style={styles.recentSearchesContainer} horizontal showsHorizontalScrollIndicator={false}>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    searchButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    searchButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    recentSearchesContainer: {
        flexDirection: 'row',
    },
    searchItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        height: 40,
        padding: 10,
        marginRight: 10,
        borderRadius: 5,
    },
    deleteButton: {
        color: '#FF6347',
        marginLeft: 10,
    },
});

export default SearchResult;
