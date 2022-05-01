import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Controller} from 'react-hook-form';

function SearchBar({control, height = 50, name, handleSearch}) {

    return (
        <Controller
            control={control}
            name={name}
            render={({field: {value, onChange, onBlur}}) => (
                <>
                    <View style={[styles.container, { height }]}>
                        <TextInput style={styles.text} value={value} onChangeText={onChange} onBlur={onBlur} placeholder='Search'/>
                        <TouchableOpacity style={styles.button} onPress={() => handleSearch(value)}>
                            <Text style={styles.buttonTitle}>SEARCH</Text>
                        </TouchableOpacity>                    
                    </View>
                </>
            )}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#cdcdcd',
        borderRadius: 25,
        flexDirection: 'row',
        width: '100%',
        padding: 15,
        marginVertical: 10,
    },  
    button: {
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        width: 90,
        height: 50,
        flexDirection: 'row',
        marginTop: -15,
        backgroundColor: '#cdcdcd',
        marginHorizontal: 25
    },
    buttonTitle: {
        color: '#000',
        fontSize: 12,
        fontWeight: 'bold',
        marginRight: 10
    },
    icon: {
        marginRight: 10,
        alignSelf: 'center',
    },
    text: {
      textAlignVertical: "top",
      width: 180
    },
});

export default SearchBar;