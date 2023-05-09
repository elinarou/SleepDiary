import React from 'react';
import { NavigationContainer, StyleSheet } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';  
import StackNavigation from './StackNavigation';
import CalendarScreen from '../contents/calendar/CalendarScreen';
import StatsScreen from '../contents/stats/StatsScreen';
import ProfileScreen from '../contents/profile/ProfileScreen';


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
    } else if (route.name === 'Profile') {
      iconName = 'user';
    }

    return <Feather name={iconName} size={size} color={color} />;
  }
});

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    // Tab navigator
    <NavigationContainer style={styles.container}>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name="Diary" component={StackNavigation} options={{ headerShown: false }} />
        <Tab.Screen name="Calendar" component={CalendarScreen} />
        <Tab.Screen name="Stats" component={StatsScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
  