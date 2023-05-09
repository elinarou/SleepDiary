import React, { useContext } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { UserContext } from '../../context/UserContext';
import LatestEntry from './LatestEntry';
import { Feather } from 'react-native-vector-icons';


export default function DiaryScreen({ navigation }) {
  const userDetails = useContext(UserContext); 

  return (
    <View style={styles.button}>
      <Text style={styles.heading}>Hello {userDetails.username}</Text>
      <LatestEntry />
      <TouchableOpacity style={styles.button} 
        onPress={() => navigation.navigate("Entry")}>
          <Text style={styles.heading}>New entry<Feather name={'plus-circle'} size={25} /></Text>
      </TouchableOpacity>
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
  
  button: {
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center'
  },

  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
});
  
