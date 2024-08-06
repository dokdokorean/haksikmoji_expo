// Search.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Search = () => {
    const [searchText, setSearchText] = useState('');
    const [recentSearches, setRecentSearches] = useState([]);

    useEffect(() => {
        loadRecentSearches();
    }, []);

    const loadRecentSearches = async () => {
        try {
            const searches = await AsyncStorage.getItem('recentSearches');
            if (searches !== null) {
                setRecentSearches(JSON.parse(searches));
            }
        } catch (error) {
            console.error('Error loading recent searches:', error);
        }
    };

    const handleSearch = async () => {
        if (searchText.trim() === '') return;

        let updatedSearches = [searchText, ...recentSearches];
        updatedSearches = updatedSearches.slice(0, 10);

        setRecentSearches(updatedSearches);
        setSearchText('');

        try {
            await AsyncStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
        } catch (error) {
            console.error('Error saving recent searches:', error);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                value={searchText}
                onChangeText={setSearchText}
                placeholder="Search..."
            />
            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>
            <ScrollView style={styles.recentSearchesContainer} horizontal showsHorizontalScrollIndicator={false}>
                {recentSearches.map((search, index) => (
                    <View key={index} style={styles.searchItem}>
                        <Text>{search}</Text>
                    </View>
                ))}
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
        backgroundColor: '#f0f0f0',
        padding: 10,
        marginRight: 10,
        borderRadius: 5,
    },
});

export default Search;
