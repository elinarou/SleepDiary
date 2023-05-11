import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';


export default function Rating(props) {
  const [color, setColor] = useState(null);
  const [review, setReview] = useState('');

  const addRating = (value) => {
    props.setEntry({...props.entry, quality: value});
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.heading}>{color ? `${review}` : 'Rate your sleep quality'}</Text>
        <View style={styles.stars}>
          <TouchableOpacity onPress={() => {
            setColor(1);
            setReview('Poor')
            addRating(1);
            }}>
            <FontAwesome
              name={color >= 1 ? 'star' : 'star-o'}
              size={32}
              style={color >= 1 ? styles.starSelected : styles.starUnselected}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            setColor(2);
            setReview('Fair') 
            addRating(2);
            }}>
            <FontAwesome
              name={color >= 2 ? 'star' : 'star-o'}
              size={32}
              style={color >= 2 ? styles.starSelected : styles.starUnselected}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            setColor(3);
            setReview('Good') 
            addRating(3);
            }}>
            <FontAwesome
              name={color >= 3 ? 'star' : 'star-o'}
              size={32}
              style={color >= 3 ? styles.starSelected : styles.starUnselected}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            setColor(4);
            setReview('Very good') 
            addRating(4);
            }}>
            <FontAwesome
              name={color >= 4 ? 'star' : 'star-o'}
              size={32}
              style={color >= 4 ? styles.starSelected : styles.starUnselected}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            setColor(5);
            setReview('Excellent')
            addRating(5);
            }}>
            <FontAwesome
              name={color >= 5 ? 'star' : 'star-o'}
              size={32}
              style={color >= 5 ? styles.starSelected : styles.starUnselected}
            />
          </TouchableOpacity>
        </View>
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
    borderWidth: 1,
    borderColor: '#CBA0AE',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },

  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  
  stars: {
    display: 'flex',
    flexDirection: 'row',
  },

  starUnselected: {
    color: '#aaa',
  },
  
  starSelected: {
    color: '#E4D192',
  },
});