import React from 'react'
import { View, Text, Image, StyleSheet, useWindowDimensions} from 'react-native'
import Logo from '../../assets/images/Logo_1.png'
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { useForm } from 'react-hook-form';

function RegisterScreen ({navigation}) {

    const {height} = useWindowDimensions();

    const {control, handleSubmit} = useForm();

    const onRegisterPressed = (data) => {
        // TODO: enviar al backend para que compruebe en BBDD que NO existe
        console.log(data);
        navigation.navigate("SWIPE");
    }


    return(
        <View style={styles.root}>
            <Image 
                source={Logo} 
                style={[styles.logo, {height: height * 0.3}]} 
                resizeMode="contain">
            </Image>
            <Text>REGISTER NOW!</Text>
            
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

            <CustomInput 
                control={control}
                name="BirthDate"
                placeholder="dd/mm/yyyy"
            >
            </CustomInput>

            <CustomInput 
                control={control}
                name="Gender"
                placeholder="F/M/Other"
            >
            </CustomInput>            

            <CustomButton
                text="Register"
                onPress={handleSubmit(onRegisterPressed)}>
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

export default RegisterScreen;