import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';  
import DiaryEntryStack from './DiaryEntryStack';
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

export default function HomeTab() {
  return (
    // Nested in LoggedInStack
    <NavigationContainer style={styles.container} independent={true}>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name="Diary" component={DiaryEntryStack} options={{ headerShown: false }} />
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
  