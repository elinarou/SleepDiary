import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Tooltip } from 'react-native-elements';
import { SegmentedButtons } from 'react-native-paper';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import differenceInMinutes from 'date-fns/differenceInMinutes';
import format from "date-fns/format";
import FormatDateTime from '../../functions/FormatDateTime';
import FormatMinutes from '../../functions/FormatMinutes';
import Rating from './Rating';



export default function AddEntry(props) {
  const [showAwake, setShowAwake] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [entry, setEntry] = useState(
    {
      entryDate: format(new Date(), 'yyyy-LL-dd'),
      bedTime: new Date(),
      sleepDelay: '0',
      awakeTime: '0',
      sleepEnd: new Date(),
      sleepTime: 0,
      comment: '',
      quality: 0
    });
  
  // Temporary variables
  let type = '';
  let pickerMode = 'date';
  let date = new Date();
  let time = new Date();
  let yesterday = date.setDate(date.getDate() - 1);

  // Handles date & time picker values
  const onChange = (event, selectedValue) => {
    if (pickerMode == 'date') {
      const currentDate = selectedValue;
      date = currentDate;

      // Opens time picker
      pickerMode = 'time';
      showDateTimePicker(pickerMode);
    }
    else if (pickerMode == 'time') {
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
    if (sleep < 0) {
      Alert.alert('', `Your sleep time ${(sleep / 60).toFixed(1)} h is invalid. Make changes to your entry.`);
    }
    else {
      setEntry({...entry, sleepTime: sleep});
      setShowRating(true);
    };
  };

  const addEntry = () => {
    props.saveEntry(entry);
  };

  return (
    <View style={styles.container}>
      {showRating ?
      // Conditional rendering, 1. & 2.
      // 1. Sleep time and rating
      <View>
          <Text style={styles.heading}>You slept for <FormatMinutes value={entry.sleepTime} /></Text>
          <Rating entry={entry} setEntry={setEntry} />
        <TouchableOpacity style={styles.button1} onPress={() => addEntry()}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View> 
      : // 2. Entry form
      <View>
        <View style={styles.section}>
          <Text style={styles.text}>When did you get into bed?</Text>
          <TouchableOpacity onPress={() => {type = 'bedTime'; showDateTimePicker(pickerMode);}}>
            <Text style={styles.text1}><FormatDateTime value={entry.bedTime} /></Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <View style={styles.tooltip}>
            <Text style={styles.text}>Sleep onset latency (SOL)</Text>
            <Tooltip 
              popover={<Text style={{ fontSize: 18 }}>How many minutes did it take to fall asleep?</Text>}
              height={50}
              width={380}
              backgroundColor='#E4D192'
            >
                <MaterialCommunityIcons name={'information'} size={25}/>
            </Tooltip>
          </View>
          <TextInput
            style={styles.input}
            onChangeText={text => setEntry({...entry, sleepDelay: text})}
            value={entry.sleepDelay}
            keyboardType='numeric'
            placeholder='Min'
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.text}>Did you wake up during the nigh?</Text>
          <SegmentedButtons
            value={showAwake}
            onValueChange={setShowAwake}
            buttons={[
              {
                value: true,
                label: 'Yes',
              },
              {
                value: false,
                label: 'No',
              }
            ]}
          />
          {showAwake && // Renders follow-up question
            (<View>
              <Text style={styles.text}>How long were you awake in total?</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => setEntry({...entry, awakeTime: text})}
                value={entry.awakeTime}
                keyboardType='numeric'
                placeholder='Min'
              />
            </View>)
          }
        </View>

        <View style={styles.section}>
          <Text style={styles.text}>When did you wake up for the last time?</Text>
          <TouchableOpacity onPress={() => {type = 'sleepEnd'; showDateTimePicker(pickerMode);}}>
            <Text style={styles.text1}><FormatDateTime value={entry.sleepEnd} /></Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.text}>Other comments?</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setEntry({...entry, comment: text})}
            value={entry.comment}
            placeholder='Comment'
            multiline
            numberOfLines={3}
            maxLength={250}
            textAlignVertical='top'
          />
        </View>

        <TouchableOpacity style={styles.button} 
          onPress={() => calculateSleep()}>
            <Text style={styles.buttonText}>Continue</Text>
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
    alignItems: 'center',
    justifyContent: 'center'
  },

  input: {
    width: 250, 
    borderColor: 'gray', 
    borderWidth: 1,
    paddingLeft: 5,  
    margin: 10
  },

  tooltip: {
    flexDirection: 'row',
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  },

  button1: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 150
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
  },

  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 80,
    marginBottom: 5,
    alignSelf: 'center',
    backgroundColor: '#CBA0AE',
    paddingHorizontal: 60,
    paddingVertical: 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
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
    paddingHorizontal: 40
  }
});
  