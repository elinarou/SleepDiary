import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Alert } from 'react-native';
import { onValue, ref, query, limitToLast, orderByChild } from 'firebase/database';
import { database } from '../../database/FirebaseConfig';
import { UserContext } from '../../context/UserContext';
import LatestEntry from './LatestEntry';
import { Feather } from 'react-native-vector-icons';
import format from "date-fns/format";
import differenceInMinutes from 'date-fns/differenceInMinutes';


export default function DiaryScreen({ navigation }) {
  const userDetails = useContext(UserContext);
  const [showLatest, setShowLatest] = useState(false);
  const [latest, setLatest] = useState([]);
  const [today, setToday] = useState(format(new Date(), "yyyy-LL-dd"));
  const [message, setMessage] = useState('');


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

  const calculateGoals = () => {
    const awakening = userDetails.awakeningGoal;
    const sleep = userDetails.sleepGoal;

    let now = new Date();
    let tomorrowGoal = new Date(now)
    tomorrowGoal.setDate(tomorrowGoal.getDate() + 1)
    tomorrowGoal.setHours(awakening.getHours());
    tomorrowGoal.setMinutes(awakening.getMinutes());
    tomorrowGoal.setSeconds(0);
    tomorrowGoal.setMilliseconds(0);

    const diff = differenceInMinutes(tomorrowGoal, now);

    if ((diff - sleep * 60) < 0) {
      const hours = Math.floor((diff - sleep * 60) / 60);
      const minutes = (diff - sleep * 60) % 60;
      setMessage(`Bed time was ${hours} h and ${minutes} min ago.`)
    }
    else if ((diff - sleep * 60) == 0) {
      setMessage(`Now is time to go to bed.`)
    }
    else {
      const hours = Math.floor((diff - sleep * 60) / 60);
      const minutes = (diff - sleep * 60) % 60;
      setMessage(`${hours} h and ${minutes} min to bed time.`)
    };
  };

  return (
    <View style={styles.container}>
      <LatestEntry showLatest={showLatest} latest={latest} />

      {userDetails.showGoals && // Shows sleep goals
        <View>
          <Text style={styles.heading}>Goals</Text>
          <Text style={styles.text}>Sleep time: {userDetails.sleepGoal} h</Text>
          <TouchableOpacity style={styles.row} onPress={() => calculateGoals()}>
            <Text style={styles.text}>Status: {message}  </Text>
            <Feather name={'refresh-cw'} size={20} />
          </TouchableOpacity>
        </View>
      }

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

  text: {

  },

  row: {
    flexDirection: 'row'
  }
});
  
