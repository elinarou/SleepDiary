import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Tooltip } from 'react-native-elements';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import differenceInMinutes from 'date-fns/differenceInMinutes';
import FormatDate from '../functions/FormatDate';
import FormatMinutes from '../functions/FormatMinutes';
import Rating from './Rating';


export default function AddEntry(props) {
  const [showAwake, setShowAwake] = useState(false);
  const [showRating, setShowRating] = useState(false);
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
  let yesterday = date.setDate(date.getDate() - 1);

  // Handles date & time picker values
  const onChange = (event, selectedValue) => {
    if (pickerMode == "date") {
      const currentDate = selectedValue;
      date = currentDate;

      // Opens time picker
      pickerMode = "time";
      showDateTimePicker(pickerMode);
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
  const showDateTimePicker = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
      minimumDate: yesterday,
      maximumDate: new Date()
    });
  };

  // Calculates total sleep time
  const calculateSleep = () => {
    let sleep = differenceInMinutes(entry.sleepEnd, entry.bedTime);
    sleep = sleep - parseInt(entry.sleepDelay) - parseInt(entry.awakeTime);
    setEntry({...entry, sleepTime: sleep});
  };

  const saveEntry = () => {
    props.saveEntry(entry);
  };

  return (
    <View style={styles.container}>
      {showRating ?
      /* Condition shows calculated sleep time and rating */
      <View>
        <Text style={styles.heading}>You slept for <FormatMinutes value={entry.sleepTime} /></Text>

        <Rating entry={entry} setEntry={setEntry} />

        <TouchableOpacity style={styles.button} onPress={() => saveEntry()}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>Save</Text>
        </TouchableOpacity>
      </View> : 
      /* Condition shows form */
      <View>
        <View style={styles.section}>
          <Text style={styles.heading}>When did you get into bed?</Text>
          <TouchableOpacity onPress={() => {type = "bedTime"; showDateTimePicker(pickerMode);}}>
            <Text style={{fontSize: 20}}><FormatDate value={entry.bedTime} /></Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <View style={styles.tooltip}>
            <Text style={styles.heading}>Sleep onset latency (SOL)</Text>
            <Tooltip 
              popover={<Text style={{fontSize: 18}}>How many minutes did it take to fall asleep?</Text>}
              height={55}
              width={380}>
                <MaterialCommunityIcons name="information" size={25}/>
            </Tooltip>
          </View>
          <TextInput
            style={styles.input}
            onChangeText={text => setEntry({...entry, sleepDelay: text})}
            value={entry.sleepDelay}
            keyboardType="numeric"
            placeholder="Min"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Did you wake up during the nigh?</Text>
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.button} 
              onPress={() => {setShowAwake(true)}}>
              <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} 
              onPress={() => {setShowAwake(false); setEntry({...entry, awakeTime: ''});}}>
              <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>No</Text>
            </TouchableOpacity>
          </View>

          {showAwake &&
            (<View>
              <Text style={styles.heading}>How long were you awake in total?</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => setEntry({...entry, awakeTime: text})}
                value={entry.awakeTime}
                keyboardType="numeric"
                placeholder="Min"
              />
            </View>)
          }
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>When did you wake up for the last time?</Text>
          <TouchableOpacity onPress={() => {type = "sleepEnd"; showDateTimePicker(pickerMode);}}>
            <Text style={{fontSize: 20}}><FormatDate value={entry.sleepEnd} /></Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Other comments?</Text>
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
        </View>

        <TouchableOpacity style={styles.button} 
          onPress={() => {
            setShowRating(true);
            calculateSleep()
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>Continue</Text>
        </TouchableOpacity>
      </View>
      }
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

  section: {
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },

  input: {
    width: 200, 
    borderColor: 'gray', 
    borderWidth: 1,
    paddingLeft: 5,  
    margin: 10
  },

  tooltip: {
    flexDirection: 'row',
  },

  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  