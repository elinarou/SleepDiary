import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { format } from 'date-fns';
import FormatDate from '../../functions/FormatDate';


export default function ChartControls(props) {
  const [showArrows, setShowArrows] = useState(false);

/*   let startDate = '';
  let endDate = '';

  const formatDates = () => {
    startDate = format(new Date(props.start), "dd.LL.");
    endDate = format(new Date(props.end), "dd.LL.");
    console.log(startDate);
    console.log(endDate);
  }; */

  return (
    <View style={styles.container}>
      {showArrows ? // Conditional rendering, 1. & 2.
      // 1. Arrows
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button}>
          <AntDesign 
            name={'left'}
            size={32}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 26 }}>
          <FormatDate value={new Date(props.start)} /> - <FormatDate value={new Date(props.end)} />
        </Text>
        <TouchableOpacity style={styles.button}>
          <AntDesign 
            name={'right'}
            size={32}
          />
        </TouchableOpacity>
      </View>
      : // 2. Initial button
      <TouchableOpacity style={styles.button} 
          onPress={() => {
            setShowArrows(true);
            props.fillChart();
          }}>
          <Text style={styles.heading}>Show latest 7 days</Text>
        </TouchableOpacity>
      }
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

  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  button: {
    padding: 5,
  },

  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
});