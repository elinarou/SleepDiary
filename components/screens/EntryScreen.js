import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import Rating from '../Rating';

export default function EntryForm() {
  const [entry, setEntry] = useState(
    {
      date: new Date(),
      bedTime: '',
      sleepOnset: '',
      //sleepDelay: '',
      awake: false,
      awakeTime: '',
      sleepEnd: '',
      //sleepTime: '',
      comment: '',
      quality: ''  
    });

  const saveEntry = () => {

  };

  return (
    <View style={styles.container}>
      <Text>When did you get into bed?</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setEntry({...entry, bedTime: text})}
        value={entry.bedTime}
        keyboardType="numeric"
        placeholder='HH:mm'
      />
      <Text>When did you fall asleep?</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setEntry({...entry, sleepOnset: text})}
        value={entry.sleepOnset}
        keyboardType="numeric"
        placeholder='HH:mm'
      />
      <Text>Did you wake up during the nigh?</Text>
      <Button
        onPress={() => setEntry({...entry, awake: true})}
        title="Yes"
      />
      {entry.awake &&
        (<View>
          <Text>How long were you awake in total?</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setEntry({...entry, awakeTime: text})}
            value={entry.awakeTime}
            keyboardType="numeric"
            placeholder='Min'
          />
        </View>)
      }
      <Text>When did you wake up?</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setEntry({...entry, sleepEnd: text})}
        value={entry.sleepEnd}
        placeholder='HH:mm'
      />
      <Text>Other comments?</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setEntry({...entry, comment: text})}
        value={entry.comment}
        placeholder='Comment'
        multiline
        numberOfLines={4}
        maxLength={250}
        textAlignVertical='top'
      />
      <Text>How would you rate your sleep quality?</Text>
      <Rating />
      <Button
        onPress={saveEntry()}
        title="Save"
      />
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

  input : {
    width:200  , 
    borderColor: 'gray', 
    borderWidth: 1,
    padding: 5,
    margin: 10
  },

  button: {
    
  }
});
  