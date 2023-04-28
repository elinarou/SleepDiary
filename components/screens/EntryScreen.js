import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import Rating from '../Rating';

const formatDate = (date, time) => {
  return `${date.getDate()}/${date.getMonth() +
    1}/${date.getFullYear()} ${time.getHours()}:${time.getMinutes()}`;
};

export default function EntryScreen() {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showAwake, setShowAwake] = useState(false);
  const [entry, setEntry] = useState(
    {
      bedTime: new Date(),
      //sleepOnset: new Date(),
      sleepDelay: '',
      awakeTime: '',
      sleepEnd: new Date(),
      //sleepTime: '',
      comment: '',
      quality: ''  
    });
  
  let type = "";
  let pickerMode = "date";

  /* const onChange = (event, selectedTime) => {
    const currentTime = selectedTime;
    setEntry({...entry, [type]: currentTime});
  }; */

  const onChange = (event, selectedValue) => {
    if (pickerMode == "date") {
      const currentDate = selectedValue;
      setDate(currentDate);
      pickerMode = "time";
      showMode(pickerMode);
    }
    else if (pickerMode == "time") {
      const selectedTime = selectedValue;
      setTime(selectedTime);
    };
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode(pickerMode);
  };

  const saveEntry = () => {

  };

  return (
    <View style={styles.container}>

      <Text>When did you get into bed?</Text>
      <TouchableOpacity onPress={() => {type = "bedTime"; showDatepicker()}}>
        <Text style={{fontSize: 20}}>{formatDate(date, time)}</Text>
      </TouchableOpacity>
      <Text>{entry.bedTime.toLocaleString()}</Text>

      <Text>How long did it take you to fall asleep?</Text>
      <TextInput
            style={styles.input}
            onChangeText={text => setEntry({...entry, sleepDelay: text})}
            value={entry.awakeTime}
            keyboardType="numeric"
            placeholder="Min"
      />

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
      <TouchableOpacity onPress={() => {type = "sleepEnd"; showDatepicker()}}>
        <Text style={{fontSize: 20}}>{formatDate(date, time)}</Text>
      </TouchableOpacity>
      <Text>{entry.bedTime.toLocaleString()}</Text>

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
};

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
  