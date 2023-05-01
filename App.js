import { StyleSheet, View } from 'react-native';
import TabNavigation from './components/navigation/TabNavigation';

export default function App() {

  return (
    <View style={styles.container}>
      <TabNavigation />
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
