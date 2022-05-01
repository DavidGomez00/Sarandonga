import React from "react";
import { View, TextInput, StyleSheet } from 'react-native';
import { Controller } from "react-hook-form";

const CustomInput = ({control, name, ...otherProps}) => {

    return (
        <Controller 
            control={control}
            name={name}
            render={({field: {value, onChange}}) => (
                <View style={styles.conteiner}>
                    <TextInput 
                        value={value}
                        onChangeText={onChange}
                        style={styles.input} 
                        {...otherProps}
                    />
                </View>
            )}
        />

    )
}

const styles = StyleSheet.create({
    conteiner: {
        backgroundColor: 'white',
        width: '100%',

        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius:5,

        paddingHorizontal: 10,
    },
    input: {},
})

export default CustomInput
