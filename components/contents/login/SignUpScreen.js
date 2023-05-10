import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../database/FirebaseConfig';


export default function SignUpScreen({ navigation }) {
  const [value, setValue] = useState({
    email: '',
    password: '',
    error: ''
  })

  async function signUp() {
    if (value.email === '' || value.password === '') {
      setValue({...value, error: 'Email and password are mandatory.'})
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, value.email, value.password);
      navigation.navigate('Sign In');
    } catch (error) {
      setValue({...value, error: error.message});
    };
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign Up</Text>

      {!!value.error && <View style={styles.error}><Text>{value.error}</Text></View>}

    <View style={styles.section}>
      <View style={styles.row}>
        <Icon style={styles.icon} name='envelope' size={20} />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setValue({...value, email: text})}
          value={value.email}
          placeholder="Email"
        />
      </View>
      <View style={styles.row}>
        <Icon style={styles.icon} name='key' size={20} />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setValue({...value, password: text})}
          value={value.password}
          secureTextEntry={true}
          placeholder="Password"
        />
        </View>
        <TouchableOpacity style={styles.button} onPress={signUp}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
      </View>
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

  section: {
    flex: 1
  },

  row: {
    flexDirection: 'row',
  },
  
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#AFD3E2',
    borderRadius: 20,
    margin: 10,
    padding: 15,
  },

  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 5,
    padding: 20,
  },

  buttonText: {
    fontSize: 20
  },

  input: {
    width: 200, 
    borderColor: 'gray', 
    borderWidth: 1,
    paddingLeft: 5,  
    margin: 10
  },

  icon: {
    alignSelf: 'center'
  },

  error: {
    marginTop: 10,
    padding: 10,
    color: '#fff',
    backgroundColor: '#D54826FF',
  }
});
