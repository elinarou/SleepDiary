import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';  
import DiaryScreen from './screens/DiaryScreen';
import CalendarScreen from './screens/CalendarScreen';
import StatsScreen from './screens/StatsScreen';
import EntryScreen from './screens/EntryScreen';


const Home = () => {
  const Stack = createNativeStackNavigator();

  return (
    // Nested stack navigator
    <Stack.Navigator>
      <Stack.Screen name="Sleep Diary"component={DiaryScreen} />
      <Stack.Screen name="Entry"component={EntryScreen} />
    </Stack.Navigator>
  );
}

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

export default function Navigation() {
  return (
    // Tab navigator
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name="Diary" component={Home} options={{ headerShown: false }} />
        <Tab.Screen name="Calendar" component={CalendarScreen} />
        <Tab.Screen name="Stats" component={StatsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

