import React from 'react';
import { useState } from 'react';
import { Text, View, Button } from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

export default function DatePicker() {
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

export default function TimePicker() {
    const [time, setTime] = useState(new Date());
  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate;
      setTime(currentDate);
    };
  
    const showTimepicker = () => {
      DateTimePickerAndroid.open({
        value: time,
        onChange,
        mode: 'time',
        is24Hour: true,
      });
    };
  
    return (
      <View>
        <Button onPress={showTimepicker} title="Add time" />
        <Text>selected: {time.toLocaleString()}</Text>
      </View>
    );
  };