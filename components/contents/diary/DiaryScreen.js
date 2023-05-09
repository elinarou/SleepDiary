import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Alert } from 'react-native';
import { onValue, ref, query, limitToLast, orderByChild } from 'firebase/database';
import { database } from '../../database/FirebaseConfig';
import { UserContext } from '../../context/UserContext';
import LatestEntry from './LatestEntry';
import { Feather } from 'react-native-vector-icons';
import format from "date-fns/format";


export default function DiaryScreen({ navigation }) {
  const userDetails = useContext(UserContext);
  const [showLatest, setShowLatest] = useState(false);
  const [latest, setLatest] = useState([]);
  const [today, setToday] = useState(format(new Date(), "yyyy-LL-dd"));

  useEffect(() => {
    const entriesRef = query(ref(database, 'entries/'),
      orderByChild('entryDate'), 
      limitToLast(1));
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

  const testEntryStatus = () => {
    if (!showLatest) {
      navigation.navigate("Entry");
    }
    else if (latest[0].entryDate == today) {
      Alert.alert('', 'You have already made an entry today.');
    }
    else {
      navigation.navigate("Entry");
    };
  };

  return (
    <View style={styles.button}>
      <Text style={styles.heading}>Hello {userDetails.username}</Text>
      <LatestEntry 
        showLatest={showLatest}
        latest={latest}
      />
      <TouchableOpacity style={styles.button} 
        onPress={() => testEntryStatus()}>
          <Text style={styles.heading}>New entry<Feather name={'plus-circle'} size={25} /></Text>
      </TouchableOpacity>
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
  
  button: {
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center'
  },

  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
});
  
