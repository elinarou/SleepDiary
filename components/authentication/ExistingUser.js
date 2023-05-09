import { useContext } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../database/FirebaseConfig';
import { UserContext } from '../context/UserContext';


export default function ExistingUser(props) {
  const userDetails = useContext(UserContext); 

  signInWithEmailAndPassword(auth, userDetails.email, userDetails.password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    props.setShowNavigation(true);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

  return(
    <View style={styles.container}>
      <Text style={styles.heading}>Sign in</Text>
      <Text style={styles.heading}>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setUserDetails({...userDetails, username: text})}
        value={userDetails.username}
        placeholder='Email'
        maxLength={250}
      />
      <Text style={styles.heading}>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setUserDetails({...userDetails, username: text})}
        value={userDetails.username}
        placeholder='******'
        maxLength={250}
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
    
  input: {
    width: 200, 
    borderColor: 'gray', 
    borderWidth: 1,
    paddingLeft: 5,  
    margin: 10
  },

  button: {
    padding: 5,
    backgroundColor: 'gray'
  },

  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
});
    