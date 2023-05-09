import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { ref, query, equalTo, orderByChild, remove, onValue } from 'firebase/database';
import { database } from '../../firebase/FirebaseConfig';
import FormatDateTime from '../../functions/FormatDateTime';
import FormatMinutes from '../../functions/FormatMinutes';


export default function SleepCalendarDay(props) {

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
      <View>
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
          onPress={() => deleteEntry()}>
          <Text style={styles.heading}>Delete</Text>
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

  listcontainer: {
    backgroundColor: '#fff',
    fontSize: 15
   },

   button: {
    padding: 5,
    backgroundColor: 'gray'
  },

   heading: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 40,
  },

  text: {
    fontSize: 20
  },

  star: {
    color: '#ffb300',
  },
});
