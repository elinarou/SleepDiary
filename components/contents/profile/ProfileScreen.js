import React, { useContext, useState } from 'react';
import Checkbox from 'expo-checkbox';
import { Tooltip } from 'react-native-elements';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { UserContext, UserDispatchContext } from '../../context/UserContext';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { useAuthentication } from '../../utils/hooks/useAuthentication';
import { signOut } from 'firebase/auth';
import { auth } from '../../database/FirebaseConfig';
import FormatTime from '../../functions/FormatTime';


export default function ProfileScreen() {
  const { user } = useAuthentication();
  const userDetails = useContext(UserContext); 
  const setUserDetails = useContext(UserDispatchContext);

  let time = new Date();

  // Handles time picker values
  const onChange = (event, selectedValue) => {
    const selectedTime = selectedValue;
    time = selectedTime;
    setUserDetails({...userDetails, awakeningGoal: time});
  };

  // Opens TimePicker
  const showTimePicker = () => {
    DateTimePickerAndroid.open({
      value: time,
      onChange,
      mode: 'time',
      is24Hour: true
    });
  };

  const setChecked = () => {
    if (userDetails.showGoals) {
      setUserDetails({...userDetails, showGoals: false});
    }
    else {
      setUserDetails({...userDetails, showGoals: true});
    };
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>User: {user?.email}</Text>

      <Text style={styles.heading}>Sleep time goal</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setUserDetails({...userDetails, sleepGoal: text})}
        value={userDetails.sleepGoal}
        keyboardType="numeric"
        placeholder="Hours"
      />

      <Text style={styles.heading}>Awakening time goal</Text>
      <TouchableOpacity onPress={() => showTimePicker()}>
        <Text style={styles.heading}><FormatTime value={userDetails.awakeningGoal} /></Text>
      </TouchableOpacity>

      <View style={styles.row}>
        <Checkbox
          style={styles.checkbox}
          value={userDetails.showGoals}
          onValueChange={setChecked}
          color={userDetails.showGoals ? '#4630EB' : undefined}
        />
        <Text style={styles.heading}>Show goals</Text>
        <Tooltip 
          popover={<Text style={{fontSize: 18}}>Enables SleepDiary to show when you should go to sleep to reach your goals.</Text>}
          height={80}
          width={380}>
          <MaterialCommunityIcons name="information" size={25}/>
        </Tooltip>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => signOut(auth)}>
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    width: 200, 
    borderColor: 'gray', 
    borderWidth: 1,
    paddingLeft: 5,  
    margin: 10
  },

  button: {
    padding: 5,
    backgroundColor: 'gray'
  },

  row: {
    flexDirection: 'row'
  },

  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },

  checkbox: {
    margin: 8,
  },
});
