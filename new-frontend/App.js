import Navigator from "./app/navigation/Navigator";
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";

export default function App ()  {
  return(
    <NavigationContainer>
            <Navigator />
    </NavigationContainer>
  )
}

