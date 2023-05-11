import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import FormatDateTime from '../../functions/FormatDateTime';
import FormatMinutes from '../../functions/FormatMinutes';
import { FontAwesome } from 'react-native-vector-icons'; 


export default function LatestEntry(props) {

  return (
    <View style={styles.container}>
      {props.showLatest ? // Conditional rendering, 1. & 2. 
        // 1. Last database entry 
        <View>
          <Text style={styles.heading}>Last entry</Text>
          <FlatList
            style={styles.list}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => 
              <View style={styles.listcontainer}>
                <Text style={styles.text}>Bedtime: <FormatDateTime value={new Date(item.bedTime)} /></Text>
                <Text style={styles.text}>Awakening: <FormatDateTime value={new Date(item.sleepEnd)} /></Text>              
                <Text style={styles.text}>Sleep time: <FormatMinutes value={item.sleepTime} /></Text>
                <Text style={styles.text}>Sleep quality: {item.quality}/5</Text>
              </View>}
            data={props.latest}
          />
        </View>
        : // 2. Initial render, if database is empty
        <View style={styles.container}>
          <Text style={styles.heading1}>Start your Sleep Diary</Text> 
          <FontAwesome name={'long-arrow-down'} size={100} />
        </View>
      }
    </View>
  );    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

   heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5,
    alignSelf: 'center',
    backgroundColor: '#E4D192',
    paddingHorizontal: 135,
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },

  heading1: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    alignSelf: 'center',
    backgroundColor: '#E4D192',
    paddingHorizontal: 135,
    paddingVertical: 10,
    borderRadius: 20
  },

  listcontainer: {
    borderWidth: 1,
    padding: 15,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderColor: '#E4D192'
  },

  text: {
    fontSize: 18,
    paddingTop: 5
  }
});