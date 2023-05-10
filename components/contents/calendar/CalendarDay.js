import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { ref, query, equalTo, orderByChild, remove, onValue } from 'firebase/database';
import { database } from '../../database/FirebaseConfig';
import FormatDateTime from '../../functions/FormatDateTime';
import FormatMinutes from '../../functions/FormatMinutes';


export default function SleepCalendarDay(props) {

  const confirmDelete = () => {
    Alert.alert('', 'Are you sure?', [
      {
        text: 'No'
      },
      {
        text: 'Yes',
        onPress: () => deleteEntry()
      }
    ]);
  }; 

  const deleteEntry = () => {
    const entriesRef = query(ref(database, 'entries/'), 
      orderByChild('entryDate'), 
      equalTo(props.selectedDate));
    // Finds and deletes key reference
    onValue(entriesRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        remove(ref(database, 'entries/' + childKey));
      });
    });  
  };

  return (
    <View style={styles.container}>
      {props.showEntry ? // Conditional rendering, 1. & 2.
      // 1. Entry info
      <View style={styles.section}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => 
            <View style={styles.listcontainer}>
              <Text style={styles.text}>Bedtime: <FormatDateTime value={new Date(item.bedTime)} /></Text>
              <Text style={styles.text}>Awakening: <FormatDateTime value={new Date(item.sleepEnd)} /></Text>              
              <Text style={styles.text}>Sleep time: <FormatMinutes value={item.sleepTime} /></Text>
              <Text style={styles.text}>Sleep latency: {item.sleepDelay} min</Text>
              <Text style={styles.text}>Awake time: {item.awakeTime} min</Text>
              <Text style={styles.text}>Sleep quality: {item.quality}/5</Text>
              <Text style={styles.text}>Comment: {item.comment}</Text>
            </View>}
          data={props.entries}
        />
        <TouchableOpacity style={styles.button}
          onPress={() => confirmDelete()}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
      : // 2. No entry found
      <Text style={styles.heading}>No entry</Text>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  section: {
    borderWidth: 1,
    borderColor: '#E4D192',
    paddingHorizontal: 55,
    borderRadius: 20
  },

  listcontainer: {
    backgroundColor: '#fff',
    marginTop: 35
   },

   button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  },

  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 5,
    alignSelf: 'center',
    backgroundColor: '#E4D192',
    paddingHorizontal: 50,
    paddingVertical: 15,
    borderRadius: 20,
  },

   heading: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 40,
  },

  text: {
    fontSize: 18
  }
});
