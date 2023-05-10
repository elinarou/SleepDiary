import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeTab from './HomeTab';

const Stack = createNativeStackNavigator();

export default function LoggedInStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeTab} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}