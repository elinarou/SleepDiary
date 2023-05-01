import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';  
import StackNavigation from './StackNavigation';
import CalendarScreen from '../screens/CalendarScreen';
import StatsScreen from '../screens/StatsScreen';


// Tab icons
const screenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;

    if (route.name === 'Diary') {
      iconName = 'book-open';
    } else if (route.name === 'Calendar') {
      iconName = 'calendar';
    } else if (route.name === 'Stats') {
      iconName = 'bar-chart';
    }

    return <Feather name={iconName} size={size} color={color} />;
  }
});

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    // Tab navigator
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name="Diary" component={StackNavigation} options={{ headerShown: false }} />
        <Tab.Screen name="Calendar" component={CalendarScreen} />
        <Tab.Screen name="Stats" component={StatsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}