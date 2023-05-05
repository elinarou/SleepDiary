import React from 'react';
import { StyleSheet, View } from 'react-native';
import AddEntry from '../contents/AddEntry';
import { database } from '../database/FirebaseConfig';
import { push, ref } from 'firebase/database';


export default function EntryScreen() {

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
      })
    .then(() => {
      // Saved successfully
      alert("Entry saved");
    })  
    .catch((error) => {
      // Save failed
      alert(error);
    });
  };

  return (
    <View style={styles.container}>
      <AddEntry saveEntry={saveEntry} />
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
  