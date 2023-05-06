import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function CalendarPicker(props) {

  return (
    <View style={styles.container}>
      <Calendar
        style={styles.calendar}
        onDayPress={day => {
          props.setSelectedDate(day.dateString);
        }}
        markedDates={{
          [props.selectedDate]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
        }}
      />
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

  calendar: {
    width: 400
  }
});
