import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 


export default function ChartControls(props) {


  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button}
          onPress={() => {
            props.fillChart();
          }}>
          <AntDesign 
            name={'left'}
            size={32}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 26 }}>{} - {}</Text>
        <TouchableOpacity style={styles.button}
          onPress={() => {
            props.fillChart();
          }}>
          <AntDesign 
            name={'right'}
            size={32}
          />
        </TouchableOpacity>
      </View>
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

});