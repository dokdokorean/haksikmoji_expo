import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchHeader from '../components/SearchHeader';

const Search = () => {
    const [searchText, setSearchText] = useState('');
    const [recentSearches, setRecentSearches] = useState([]);
    const searchInputRef = useRef(null);

    useEffect(() => {
        loadRecentSearches();
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
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

        const newSearch = { id: Date.now().toString(), text: searchText };
        let updatedSearches = [newSearch, ...recentSearches];
        updatedSearches = updatedSearches.slice(0, 10);

        setRecentSearches(updatedSearches);
        setSearchText('');

        try {
            await AsyncStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
        } catch (error) {
            console.error('Error saving recent searches:', error);
        }
    };

    const deleteSearchItem = async (id) => {
        const updatedSearches = recentSearches.filter(search => search.id !== id);
        setRecentSearches(updatedSearches);

        try {
            await AsyncStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
        } catch (error) {
            console.error('Error deleting search item:', error);
        }
    };

    return (
        <View style={styles.container}>
            <SearchHeader />
            <TextInput
                ref={searchInputRef}
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
                    <View key={search.id} style={styles.searchItem}>
                        <Text>{search.text}</Text>
                        <TouchableOpacity onPress={() => deleteSearchItem(search.id)}>
                            <Text style={styles.deleteButton}>X</Text>
                        </TouchableOpacity>
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

export default Search;
