import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import ExistingUser from './ExistingUser';
import NewUser from './NewUser';
import TabNavigation from '../navigation/TabNavigation';


export default function AuthScreen() {
  const [showNavigation, setShowNavigation] = useState(false);
  
  return(
    <View style={styles.container}>
    {showNavigation ? // Conditional rendering, 1. & 2.
      // 1. Tabs
      <TabNavigation />
      : // 2. Authentication
      <View>
        <NewUser setShowNavigation={setShowNavigation} />
        <ExistingUser setShowNavigation={setShowNavigation} />
      </View>
    }
    </View>
 );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});
    