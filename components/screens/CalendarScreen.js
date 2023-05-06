import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import SleepCalendar from '../contents/SleepCalendar';
import SleepCalendarDay from '../contents/SleepCalendarDay';
import { onValue, ref, query, orderByChild, equalTo } from 'firebase/database';
import { database } from '../database/FirebaseConfig';


export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState('');
  const [entries, setEntries] = useState([]);
  const [showEntry, setShowEntry] = useState(false);

  useEffect(() => {
    const entriesRef = query(ref(database, 'entries/'), orderByChild('entryDate'), equalTo(selectedDate));
    onValue(entriesRef, (snapshot) => {
      if (snapshot.val() != null) {
        const data = snapshot.val();
        setEntries(Object.values(data));
        setShowEntry(true);
      }
      else {
        setShowEntry(false);
      };
    })
  }, [selectedDate]);

  return (
    <View style={styles.container}>
      <SleepCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <SleepCalendarDay selectedDate={selectedDate} entries={entries} showEntry={showEntry}/>
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
