import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../screens/LoginScreen";
import Swiper from "../screens/Swiper";
import RegisterScreen from "../screens/RegisterScreen";
import SearchLocals from "../screens/SearchLocals";

const Stack = createStackNavigator();

const Navigator = () => (
    <Stack.Navigator screenOptions={{ headerShown: false}}>
        <Stack.Screen name="LOGIN" component={Login} />
        <Stack.Screen name="REGISTER" component={RegisterScreen} />      
        <Stack.Screen name="SWIPE" component={Swiper} />    
        <Stack.Screen name="SEARCH" component={SearchLocals} />
    </Stack.Navigator>
);

export default Navigator;