import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function EntryForm() {

  return (
    <View style={styles.container}>
      <Text>When did you get into bed?</Text>
      <Text>When did you fall asleep?</Text>
      <Text>How many times did you wake up during the nigh?</Text>
      <Text>1. Wake-up: How long you were awake?</Text>
      <Text>When did you wake up?</Text>
      <Text>When did you get out of bed?</Text>
      <Text>How would you rate your sleep quality?</Text>
      <Text>Other comments?</Text>
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
  