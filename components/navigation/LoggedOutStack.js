import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoggedOutScreen from '../contents/login/LoggedOutScreen';
import SignInScreen from '../contents/login/SignInScreen';
import SignUpScreen from '../contents/login/SignUpScreen';


const Stack = createNativeStackNavigator();

export default function LoggedOutStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={LoggedOutScreen} />
        <Stack.Screen name="Sign In" component={SignInScreen} />
        <Stack.Screen name="Sign Up" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};