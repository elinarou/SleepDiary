import { StyleSheet, View } from 'react-native';
import RootNavigation from './components/navigation/RootNavigation';
import { UserProvider } from './components/context/UserContext';


export default function App() {

  return (
    <View style={styles.container}>
      <UserProvider>
        <RootNavigation />
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
