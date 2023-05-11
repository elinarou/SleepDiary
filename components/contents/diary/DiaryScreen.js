import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Alert } from 'react-native';
import { onValue, ref, query, limitToLast, orderByChild } from 'firebase/database';
import { database } from '../../database/FirebaseConfig';
import { UserContext } from '../../context/UserContext';
import LatestEntry from './LatestEntry';
import { Feather } from 'react-native-vector-icons';
import format from "date-fns/format";
import differenceInMinutes from 'date-fns/differenceInMinutes';
import FormatTime from '../../functions/FormatTime';


export default function DiaryScreen({ navigation }) {
  const userDetails = useContext(UserContext);
  const [showLatest, setShowLatest] = useState(false);
  const [latest, setLatest] = useState([]);
  const [today, setToday] = useState(format(new Date(), 'yyyy-LL-dd'));
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

  // Tests if there is already an entry with the same entryDate
  const testEntryStatus = () => {
    if (!showLatest) {
      navigation.navigate('Entry');
    }
    else if (latest[0].entryDate == today) {
      Alert.alert('', 'You have already made an entry today.');
    }
    else {
      navigation.navigate('Entry');
    };
  };

  // Returns goal status based on profile
  const calculateGoals = () => {
    const awakening = userDetails.awakeningGoal;
    const sleep = userDetails.sleepGoal;

    let now = new Date();
    let tomorrowGoal = new Date(now);
    tomorrowGoal.setDate(tomorrowGoal.getDate() + 1);
    tomorrowGoal.setHours(awakening.getHours());
    tomorrowGoal.setMinutes(awakening.getMinutes());
    tomorrowGoal.setSeconds(0);
    tomorrowGoal.setMilliseconds(0);

    const diff = differenceInMinutes(tomorrowGoal, now);

    if ((diff - sleep * 60) == 0) {
      setMessage(`Now is time to go to bed.`);
    }
    else {
      const hours = Math.floor((diff - sleep * 60) / 60);
      const minutes = (diff - sleep * 60) % 60;
      setMessage(`${hours} h ${minutes} min to bedtime.`);
    };
  };

  return (
    <View style={styles.container}>

      <LatestEntry showLatest={showLatest} latest={latest} />

      {userDetails.showGoals && // Shows goals, if enabled in profile
        <View style={styles.section}>
          <Text style={styles.heading}>Goals</Text>

          <View style={styles.listcontainer}>
            <Text style={styles.text}>Sleep time: {userDetails.sleepGoal} h</Text>
            <Text style={styles.text}>Tomorrow's wake-up: <FormatTime value={userDetails.awakeningGoal} /></Text>  
            <TouchableOpacity style={styles.row} onPress={() => calculateGoals()}>
              <Text style={styles.text}>Status: {message}  </Text>
              <Feather style={styles.icon} name={'refresh-cw'} size={20} />
            </TouchableOpacity>
          </View>

        </View>
      }

      <TouchableOpacity style={styles.button} 
        onPress={() => testEntryStatus()}>
          <Text style={styles.buttonText}>New entry</Text>
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

  section: {
    flex: 1,
    backgroundColor: '#fff',
  },

  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5,
    alignSelf: 'center',
    backgroundColor: '#CBA0AE',
    paddingHorizontal: 155,
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },

  listcontainer: {
    borderWidth: 1,
    padding: 15,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderColor: '#CBA0AE'
  },

  text: {
    fontSize: 18,
    paddingTop: 5
  },

  row: {
    flexDirection: 'row'
  },

  icon: {
    alignSelf: 'center'
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },

  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 5,
    alignSelf: 'center',
    backgroundColor: '#AF7AB3',
    paddingHorizontal: 50,
    paddingVertical: 15,
    borderRadius: 20,
  }
});
  
