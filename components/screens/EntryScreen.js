import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AddEntry from '../contents/AddEntry';
import Feedback from '../contents/Feedback';
import { database } from '../../FirebaseConfig';
import { push, ref } from 'firebase/database';


export default function EntryScreen() {
  const [showFeedback, setShowFeedback] = useState(false);

  // Pushes entry to the database
  const saveEntry = (entry) => {
    push(
      ref(database, 'entries/'), { 
        'bedTime': entry.bedTime.toString(), 
        'sleepDelay': entry.sleepDelay,
        'awakeTime': entry.awakeTime,
        'sleepEnd': entry.sleepEnd.toString(),
        'sleepTime': entry.sleepTime,
        'comment': entry.comment,
        'quality': entry.quality 
      });
  };

  return (
    <View style={styles.container}>
      {showFeedback ? <Feedback /> : <AddEntry setShowFeedback={setShowFeedback} saveEntry={saveEntry} />}
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
  