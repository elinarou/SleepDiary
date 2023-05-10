import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';


export default function LoggedOutScreen({ navigation }) {
  
  return(
    <View style={styles.container}>
      <Text style={styles.heading}>Sleep Diary</Text>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('Sign In')}>
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('Sign Up')}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
 );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttons: {
    flex: 1,
    paddingTop: 20,
  },
  
  button1: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#AFD3E2',
    borderRadius: 20,
    margin: 10,
    padding: 20,
    paddingHorizontal: 50,
  },

  button2: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:  '#fff',
    borderWidth: 2,
    borderColor: '#AFD3E2',
    borderRadius: 20,
    margin: 10,
    padding: 20,
    paddingHorizontal: 50,
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
  }
});
    