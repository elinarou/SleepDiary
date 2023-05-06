import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { ref, onValue, query, limitToLast } from 'firebase/database';
import { database } from '../database/FirebaseConfig';


export default function StatsScreen() {
  const [entries, setEntries] = useState([]);

/*   useEffect(() => {
    const entriesRef = query(ref(database, 'entries/'), limitToLast(1));
    onValue(entriesRef, (snapshot) => {
      if (snapshot.val() !== null) {
        const data = snapshot.val();
        setEntries(Object.values(data));
      }
    })
  }, []); */


  return (
    <View style={styles.container}>
      <Text>Stats!</Text>   
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

});