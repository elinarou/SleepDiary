import { StyleSheet, View } from 'react-native';
import RootNavigation from './components/navigation/RootNavigation';


export default function App() {

  return (
    <View style={styles.container}>
      <RootNavigation />
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
