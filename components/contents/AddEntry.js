import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import differenceInMinutes from 'date-fns/differenceInMinutes';
import FormatDate from '../functions/FormatDate';
import Rating from '../Rating';


export default function AddEntry() {
  const [showAwake, setShowAwake] = useState(false);
  const [entry, setEntry] = useState(
    {
      bedTime: new Date(),
      sleepDelay: '0',
      awakeTime: '0',
      sleepEnd: new Date(),
      sleepTime: 0,
      comment: '',
      quality: 0  
    });
  
  // Temporary variables
  let type = "";
  let pickerMode = "date";
  let date = new Date();
  let time = new Date();

  // Handles date & time picker values
  const onChange = (event, selectedValue) => {
    if (pickerMode == "date") {
      const currentDate = selectedValue;
      date = currentDate;

      // Opens time picker
      pickerMode = "time";
      showMode(pickerMode);
    }
    else if (pickerMode == "time") {
      const selectedTime = selectedValue;
      time = selectedTime;
      
      // Combines selected date and time
      date.setHours(time.getHours());
      date.setMinutes(time.getMinutes());
      date.setSeconds(0);
      date.setMilliseconds(0);

      // Enters either entry.bedtime or entry.sleepEnd
      setEntry({...entry, [type]: date});
    };
  };

  // Opens DateTimePicker
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

  // Calculates total sleep time 
  const calculateSleep = () => {
    let sleep = differenceInMinutes(entry.sleepEnd, entry.bedTime);
    sleep = sleep - parseInt(entry.sleepDelay) - parseInt(entry.awakeTime);
    setEntry({...entry, sleepTime: sleep});
  };

  const saveEntry = () => {
    calculateSleep();
  };

  return (
    <View style={styles.container}>

      <Text>When did you get into bed?</Text>
      <TouchableOpacity onPress={() => {type = "bedTime"; showDatepicker()}}>
        <Text style={{fontSize: 20}}><FormatDate value={entry.bedTime} /></Text>
      </TouchableOpacity>

      <Text>How long did it take you to fall asleep? (min)</Text>
      <TextInput
            style={styles.input}
            onChangeText={text => setEntry({...entry, sleepDelay: text})}
            value={entry.sleepDelay}
            keyboardType="numeric"
            placeholder="Min"
      />

      <Text>Did you wake up during the nigh?</Text>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} 
            onPress={() => {setShowAwake(true)}}>
            <Text style={{fontSize: 20, color: 'white'}}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} 
            onPress={() => {setShowAwake(false); setEntry({...entry, awakeTime: ''});}}>
            <Text style={{fontSize: 20, color: 'white'}}>No</Text>
        </TouchableOpacity>
      </View>

      {showAwake &&
        (<View>
          <Text>How long were you awake in total? (min)</Text>
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
        <Text style={{fontSize: 20}}><FormatDate value={entry.sleepEnd} /></Text>
      </TouchableOpacity>

      <Rating entry={entry} setEntry={setEntry} />

      <Text>Other comments?</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setEntry({...entry, comment: text})}
        value={entry.comment}
        placeholder="Comment"
        multiline
        numberOfLines={3}
        maxLength={250}
        textAlignVertical="top"
      />

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} 
          onPress={() => {
            saveEntry();
            }}>
            <Text style={{fontSize: 20, color: 'white'}}>Save</Text>
        </TouchableOpacity>
      </View>
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
    justifyContent: 'space-between',
    backgroundColor: 'gray',
  },

  button: {
    padding: 5
  }
});
  