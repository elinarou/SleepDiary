import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AddEntry from '../contents/AddEntry';
import Feedback from '../contents/Feedback';


export default function EntryScreen() {
  const [showFeedback, setShowFeedback] = useState(false);


  return (
    <View style={styles.container}>
      {showFeedback ? <Feedback /> : <AddEntry setShowFeedback={setShowFeedback}/>}
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
  