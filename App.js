import { StyleSheet, View } from 'react-native';
import { UserProvider } from './components/context/UserContext';
import AuthScreen from './components/authentication/AuthScreen';


export default function App() {

  return (
    <View style={styles.container}>
      <UserProvider>
        <AuthScreen />
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
