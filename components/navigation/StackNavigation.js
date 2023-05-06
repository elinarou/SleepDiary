import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DiaryScreen from '../contents/diary/DiaryScreen';
import EntryScreen from '../contents/diary/EntryScreen';


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