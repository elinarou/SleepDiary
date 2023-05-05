import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { onValue, ref, query, limitToLast } from 'firebase/database';
import { database } from '../database/FirebaseConfig';
import FormatDate from '../functions/FormatDate';
import FormatMinutes from '../functions/FormatMinutes';


export default function LatestEntry() {
  const [latest, setLatest] = useState([]);

  useEffect(() => {
    const entriesRef = query(ref(database, 'entries/'), limitToLast(1));
    onValue(entriesRef, (snapshot) => {
      const data = snapshot.val();
      setLatest(Object.values(data));
    })
  }, []);


  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your latest entry</Text>
      <FlatList
      style={styles.list}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => 
        <View style={styles.listcontainer}>
          <Text>You went to bed <FormatDate value={new Date(item.bedTime)} /></Text>
          <Text>You woke up <FormatDate value={new Date(item.sleepEnd)} /></Text>              
          <Text>Your latest sleep lasted for <FormatMinutes value={item.sleepTime} /></Text>
        </View>}
      data={latest}
    /> 
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

  list: {
    margin: 50
  },

  listcontainer: {
    backgroundColor: '#fff',
    alignItems: 'center'
   },

   heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
});