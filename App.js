import { StyleSheet, View } from 'react-native';
import TabNavigation from './components/navigation/TabNavigation';
import { UserProvider } from './components/context/UserContext';


export default function App() {

  return (
    <View style={styles.container}>
      <UserProvider>
        <TabNavigation />
      </UserProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
});
