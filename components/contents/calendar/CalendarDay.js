import React, {useState} from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import FormatDateTime from '../../functions/FormatDateTime';
import FormatMinutes from '../../functions/FormatMinutes';


export default function SleepCalendarDay(props) {

  return (
    <View style={styles.container}>
      {props.showEntry ?
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => 
          <View style={styles.listcontainer}>
            <Text style={styles.text}>Bedtime: <FormatDateTime value={new Date(item.bedTime)} /></Text>
            <Text style={styles.text}>Awakening: <FormatDateTime value={new Date(item.sleepEnd)} /></Text>              
            <Text style={styles.text}>Sleep time: <FormatMinutes value={item.sleepTime} /></Text>
            <Text style={styles.text}>Sleep latency: {item.sleepDelay} min</Text>
            <Text style={styles.text}>Awake time: {item.awakeTime} min</Text>
            <Text style={styles.text}>Sleep quality: {item.quality}/5</Text>
            <Text style={styles.text}>Comment: {item.comment}</Text>
          </View>}
        data={props.entries}
      />:
      <Text style={styles.heading}>No entry</Text>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  listcontainer: {
    backgroundColor: '#fff',
    fontSize: 15
   },

   heading: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 40,
  },

  text: {
    fontSize: 20
  },

  star: {
    color: '#ffb300',
  },
});
