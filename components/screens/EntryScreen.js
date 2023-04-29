import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AddEntry from '../contents/AddEntry';


export default function EntryScreen() {


  return (
    <View style={styles.container}>
    <AddEntry />
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
  