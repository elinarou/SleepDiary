import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import AddEntry from './AddEntry';
import { database } from '../../database/FirebaseConfig';
import { push, ref } from 'firebase/database';


export default function EntryScreen() {
  const [showFeedback, setShowFeedback] = useState(false);

  // Pushes entry to the database
  const saveEntry = (entry) => {
    push(
      ref(database, 'entries/'), { 
        'entryDate': entry.entryDate,
        'bedTime': entry.bedTime.toString(), 
        'sleepDelay': parseInt(entry.sleepDelay),
        'awakeTime': parseInt(entry.awakeTime),
        'sleepEnd': entry.sleepEnd.toString(),
        'sleepTime': entry.sleepTime,
        'comment': entry.comment,
        'quality': entry.quality,
      })
    .then(() => {
      // Saved successfully
      setShowFeedback(true);
    })  
    .catch((error) => {
      // Save failed
      Alert.alert('', error);
    });
  };

  return (
    <View style={styles.container}>
      {showFeedback ?
        <Text style={styles.heading}>Entry saved</Text>
        :
        <AddEntry saveEntry={saveEntry} />
      }
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
  