import React, {useState} from 'react'
import { View, Text, Image, StyleSheet, useWindowDimensions} from 'react-native'
import Logo from '../../assets/images/Logo_1.png'
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { useForm } from 'react-hook-form';

function Login ({navigation}) {

    const {height} = useWindowDimensions();

    const {control, handleSubmit} = useForm();

    const onSignInPressed = (data) => {
        // TODO: enviar al backend para que compruebe en BBDD si existe
        console.log(data);
        navigation.navigate("SWIPE");
    }

    const onForgotPasswordPressed = () => {
        alert("Forgot Password Pressed");
    }

    return(
        <View style={styles.root}>
            <Image 
                source={Logo} 
                style={[styles.logo, {height: height * 0.3}]} 
                resizeMode="contain">
            </Image>
            
            <CustomInput 
                control={control}
                name="Username"
                placeholder="Username"
            >
            </CustomInput>

            <CustomInput 
                control={control}
                name="Password"
                placeholder="Password"
                secureTextEntry={true}>
            </CustomInput>

            <CustomButton
                text="Sign In"
                onPress={handleSubmit(onSignInPressed)}>
            </CustomButton>

            <CustomButton
                text="Forgot password"
                onPress={onForgotPasswordPressed} 
                type="TERTIARY">
            </CustomButton>

            
            <CustomButton
                text="I don't have an account"
                onPress={() => navigation.navigate("REGISTER")} 
                type="TERTIARY">
            </CustomButton>

        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: '70%',
        maxWidth: 300,
        maxHeight: 200,
    },
});

export default Login;