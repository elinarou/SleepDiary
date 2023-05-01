import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DiaryScreen from '../screens/DiaryScreen';
import EntryScreen from '../screens/EntryScreen';


const Stack = createNativeStackNavigator();

export default function StackNavigation() {

    return (
      // Nested stack navigator
      <Stack.Navigator>
        <Stack.Screen name="Sleep Diary"component={DiaryScreen} />
        <Stack.Screen name="Entry"component={EntryScreen} />
      </Stack.Navigator>
    );
    
};