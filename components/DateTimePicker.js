import React from 'react';
import { useState } from 'react';
import { Text, View, Button } from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

export function DatePicker() {
  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showDatepicker = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: 'date'
    });
  };

  return (
    <View>
      <Button onPress={showDatepicker} title="Add date" />
      <Text>selected: {date.toLocaleString()}</Text>
    </View>
  );
};

export default function TimePicker(props) {
  const [entry, setEntry] = useState(
    {
      entryDate: new Date(),
      bedTime: new Date(),
      sleepOnset: new Date(),
      //sleepDelay: '',
      awake: false,
      awakeTime: '10',
      sleepEnd: new Date(),
      //sleepTime: '',
      comment: 'Testikommentti',
      quality: ''  
    });
  
    const onChange = (event, selectedTime) => {
      const currentTime = selectedTime;
      setEntry({...entry, bedTime: currentTime});
    };
  
    const showTimepicker = () => {
      DateTimePickerAndroid.open({
        value: entry.bedTime,
        onChange,
        mode: 'time',
        is24Hour: true,
      });
    };
  
    return (
      <View>
        <Button onPress={showTimepicker} title="Add time" />
        <Text>{entry.bedTime.toLocaleString()}</Text>
      </View>
    );
  };