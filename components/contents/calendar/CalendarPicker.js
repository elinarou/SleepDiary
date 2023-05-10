import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function CalendarPicker(props) {

  return (
    <View style={styles.container}>
      <Calendar
        style={{ width: 380 }}
        theme={{
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#E4D192',
          arrowColor: '#80558C'
        }}
        onDayPress={day => {
          props.setSelectedDate(day.dateString);
        }}
        markedDates={{
          [props.selectedDate]: {
            selected: true, 
            selectedColor: '#CBA0AE',
          }
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
});
