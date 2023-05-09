import React, { useContext } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { UserContext, UserDispatchContext } from '../../context/UserContext';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import FormatTime from '../../functions/FormatTime';


export default function ProfileScreen() {
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

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Username</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setUserDetails({...userDetails, username: text})}
        value={userDetails.username}
        placeholder="Username"
        maxLength={250}
      />
      <Text style={styles.heading}>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setUserDetails({...userDetails, email: text})}
        value={userDetails.email}
        placeholder="Email"
        maxLength={250}
      />
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
      <TouchableOpacity style={styles.button}>
        <Text style={styles.heading}>Save</Text>
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

  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
});
