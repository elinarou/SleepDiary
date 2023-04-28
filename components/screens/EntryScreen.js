import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import Rating from '../Rating';

export default function EntryScreen() {
  const [time, setTime] = useState(new Date());
  const [showAwake, setShowAwake] = useState(false);
  const [entry, setEntry] = useState(
    {
      entryDate: new Date(),
      bedTime: new Date(),
      sleepOnset: new Date(),
      //sleepDelay: '',
      awakeTime: '',
      sleepEnd: new Date(),
      //sleepTime: '',
      comment: '',
      quality: ''  
    });
  
  let type = "";

  const onChange = (event, selectedTime) => {
    const currentTime = selectedTime;
    setEntry({...entry, [type]: currentTime});
  };

  const showTimepicker = () => {
    DateTimePickerAndroid.open({
      value: time,
      onChange,
      mode: "time",
      is24Hour: true,
    });
  };

  const saveEntry = () => {

  };

  return (
    <View style={styles.container}>

      <Text>When did you get into bed?</Text>
      <Button onPress={() => {type = "bedTime"; showTimepicker();}} title="Add time" />
      <Text>{entry.bedTime.toLocaleString()}</Text>

      <Text>When did you fall asleep?</Text>
      <Button onPress={() => {type = "sleepOnset"; showTimepicker();}} title="Add time" />
      <Text>{entry.sleepOnset.toLocaleString()}</Text>

      <Text>Did you wake up during the nigh?</Text>
      <View style={styles.buttons}>
        <Button
          onPress={() => {setShowAwake(true)}}
          title="Yes"
        />
        <Button
          onPress={() => {setShowAwake(false); setEntry({...entry, awakeTime: ''});}}
          title="No"
        />
      </View>

      {showAwake &&
        (<View>
          <Text>How long were you awake in total?</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setEntry({...entry, awakeTime: text})}
            value={entry.awakeTime}
            keyboardType="numeric"
            placeholder="Min"
          />
        </View>)
      }
      <Text>When did you wake up for the last time?</Text>
      <Button onPress={() => {type = "sleepEnd"; showTimepicker();}} title="Add time" />
      <Text>{entry.sleepEnd.toLocaleString()}</Text>
  
      <Text>Other comments?</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setEntry({...entry, comment: text})}
        value={entry.comment}
        placeholder="Comment"
        multiline
        numberOfLines={4}
        maxLength={250}
        textAlignVertical="top"
      />

      <Text>How would you rate your sleep quality?</Text>
      <Rating />

      <Button onPress={saveEntry()} title="Save" />
    
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

  input : {
    width:200  , 
    borderColor: 'gray', 
    borderWidth: 1,
    padding: 5,
    margin: 10
  },

  buttons : {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  button: {
    
  }
});
  