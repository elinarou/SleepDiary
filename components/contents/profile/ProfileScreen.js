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
      <View style={styles.section1}>
        <Text style={styles.heading}>Profile</Text>
        <Text style={styles.heading1}>User: {user?.email}</Text>
      </View>
  
      <View style={styles.section}>
        <Text style={styles.text}>Sleep time goal</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setUserDetails({...userDetails, sleepGoal: text})}
          value={userDetails.sleepGoal}
          keyboardType="numeric"
          placeholder="Hours"
        />

        <Text style={styles.text}>Awakening time goal</Text>
        <TouchableOpacity onPress={() => showTimePicker()}>
          <Text style={styles.text1}><FormatTime value={userDetails.awakeningGoal} /></Text>
        </TouchableOpacity>

        <View style={styles.row}>
          <Checkbox
            style={styles.checkbox}
            value={userDetails.showGoals}
            onValueChange={setChecked}
            color={userDetails.showGoals ? '#AF7AB3' : undefined}
          />
          <Text style={styles.text}>Show goals</Text>
          <Tooltip 
            popover={<Text style={{fontSize: 18}}>Enables Sleep Diary to show when you should go to sleep to reach your goals.</Text>}
              height={80}
              width={380}
              backgroundColor='#E4D192'>
            <MaterialCommunityIcons name="information" size={25}/>
          </Tooltip>
        </View>
      
        <TouchableOpacity style={styles.button} onPress={() => signOut(auth)}>
          <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

   heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 20,
    alignSelf: 'center',
  },

  heading1: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
  },

  section: {
    padding: 20,
    paddingBottom: 10,
    paddingHorizontal: 65,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E4D192',
    borderRadius: 20
  },

  section1: {
    padding: 20,
    paddingBottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5,
  },

  text1: {
    fontSize: 16,
    borderWidth: 1,
    padding: 5,
    borderRadius: 20,
    paddingHorizontal: 40,
    marginBottom: 10
  },

  input: {
    width: 200, 
    borderColor: 'gray', 
    borderWidth: 1,
    paddingLeft: 5,  
    margin: 10
  },

  row: {
    flexDirection: 'row'
  },

  checkbox: {
    margin: 8,
    alignSelf: 'flex-end'
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30
  },

  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 5,
    alignSelf: 'center',
    backgroundColor: '#E4D192',
    paddingHorizontal: 50,
    paddingVertical: 15,
    borderRadius: 20,
  }
});
