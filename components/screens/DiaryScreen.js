import React from 'react';
import { StyleSheet, View, Button } from 'react-native';


export default function DiaryScreen({ navigation }) {

  return (
    <View style={styles.button}>
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
    
  }
});
  
