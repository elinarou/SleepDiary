import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { onValue, ref, query, limitToLast } from 'firebase/database';
import { database } from '../database/FirebaseConfig';
import FormatDateTime from '../functions/FormatDateTime';
import FormatMinutes from '../functions/FormatMinutes';


export default function LatestEntry() {
  const [showLatest, setShowLatest] = useState(false);
  const [latest, setLatest] = useState([]);

  useEffect(() => {
    const entriesRef = query(ref(database, 'entries/'), limitToLast(1));
    onValue(entriesRef, (snapshot) => {
      if (snapshot.val() !== null) {
        const data = snapshot.val();
        setLatest(Object.values(data));
        setShowLatest(true);
      } 
      else {
        setShowLatest(false);
      };
    })
  }, []);


  return (
    <View style={styles.container}>
      {showLatest ?
        <View>
          <Text style={styles.heading}>Your latest entry</Text>
          <FlatList
            style={styles.list}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => 
              <View style={styles.listcontainer}>
                <Text style={styles.heading}>{item.entryDate}</Text>
                <Text>Bedtime: <FormatDateTime value={new Date(item.bedTime)} /></Text>
                <Text>Awakening: <FormatDateTime value={new Date(item.sleepEnd)} /></Text>              
                <Text>Sleep time: <FormatMinutes value={item.sleepTime} /></Text>
                <Text>Sleep latency: {item.sleepDelay}</Text>
                <Text>Awake time: {item.awakeTime}</Text>
                <Text>Quality: {item.quality}</Text>
                <Text>Comment: {item.comment}</Text>
              </View>}
            data={latest}
          />
        </View>
        : <Text style={styles.heading}>Start your Sleep Diary</Text> 
      }
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