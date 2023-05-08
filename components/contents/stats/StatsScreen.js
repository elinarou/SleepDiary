import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { ref, onValue, query, orderByChild, startAt, endAt, limitToLast } from 'firebase/database';
import { database } from '../../database/FirebaseConfig';
import StackedBarCharts from './StackedBarCharts';
import ChartControls from './ChartControls';


export default function StatsScreen() {
  const [entries, setEntries] = useState([]);
  const [start, setStart] = useState();
  const [end, setEnd] = useState();

  useEffect(() => {
    const entriesRef = query(ref(database, 'entries/'), 
      orderByChild('entryDate'),
      startAt('2023-05-01'),
      endAt('2023-05-07'),
      limitToLast(7)
    );
    onValue(entriesRef, (snapshot) => {
      if (snapshot.val() !== null) {
        const data = snapshot.val();
        setEntries(Object.values(data));
      }
    })
  }, []);


  return (
    <View style={styles.container}>
      <StackedBarCharts entries={entries} />  
      <ChartControls setStart={setStart} setEnd={setEnd} />
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