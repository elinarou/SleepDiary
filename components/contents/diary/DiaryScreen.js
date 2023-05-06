import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import LatestEntry from './LatestEntry';


export default function DiaryScreen({ navigation }) {

  return (
    <View style={styles.button}>
      <LatestEntry />
      <Button 
        onPress={() => navigation.navigate("Entry")}
        title="Make an entry"
      />
    </View>
  ); 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  button: {
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center'
  }
});
  
