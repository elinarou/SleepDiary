import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { ref, onValue, query, orderByChild, endAt, limitToLast } from 'firebase/database';
import { database } from '../../database/FirebaseConfig';
import BarCharts from './BarChart';
import format from 'date-fns/format';


export default function StatsScreen() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const entriesRef = query(ref(database, 'entries/'), 
      orderByChild('entryDate'),
      limitToLast(7)
    );
    onValue(entriesRef, (snapshot) => {
      if (snapshot.val() !== null) {
        const data = snapshot.val();
        setEntries(Object.values(data));
      }
    });
  }, []);


  return (
    <View style={styles.container}>
      <BarCharts entries={entries} />  
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