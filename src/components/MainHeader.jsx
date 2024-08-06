import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet, Pressable, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MainHeader = ({ }) => {
    const navigation = useNavigation();

    const Search = () => {
        navigation.navigate('Search');
    };
    return (
        <View style={styles.view}>
            <Text style={styles.logotext}>연세대 학식모지</Text>
            <View style = {styles.buttonview}>
                <Button title='🔔'></Button>
                <Button title='🔍' onPress={Search}></Button>                
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        height: 100,
        paddingTop: 1,
        backgroundColor: 'rgba(0, 0, 0)', // Black background with 50% opacity
        flexDirection:'row',
    },
    buttonview : {
        flexDirection: 'row',
        position:'absolute',
        right:10,
        bottom:10,
    },
    logotext:{
        position: 'absolute',
        left: 10,
        bottom: 10,
        fontSize:20,
        fontWeight:700
    }
});

export default MainHeader;

