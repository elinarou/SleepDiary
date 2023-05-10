import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';


export default function LoggedOutScreen({ navigation }) {
  
  return(
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome</Text>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Sign In')}>
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Sign Up')}>
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

  buttons: {
    flex: 1,
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

  buttonText: {

  }
});
    