import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';


export default function FeedbackScreen() {
  

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Entry saved</Text>
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

  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
});
  