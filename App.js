import { useState } from 'react';
import { StyleSheet, View, Button, SafeAreaView, Pressable, ScrollView } from 'react-native';
import NumericInput from 'react-native-numeric-input';
import { RadioButton, TextInput, Text, Switch } from 'react-native-paper';

export default function App() {

  const [bottles, setBottles] = useState(0);
  const [gender, setGender] = useState("female");
  const [hours, setHours] = useState(0);
  const [weight, setWeight] = useState(0);
  const [result, setResult] = useState(0);
  const [error, setError] = useState('');
  const [darkTheme, setDarkTheme] = useState(false)

  const myStyle = darkTheme ? darkStyles : styles;
  const color = darkTheme ? '#ffffff' : '#000000'

  function calculate() {
    let litres = bottles * 0.33;
    let grams = litres * 8 * 4.5;
    let burning = weight / 10;
    let gramsLeft = grams - burning * hours;
    let result = null;
    let error = '';

    if (gender === "female") {
      result = gramsLeft / (weight * 0.6);
    } else {
      result = gramsLeft / (weight * 0.7);
    }

    if (weight == 0 || weight < 0 || weight === '') {
      error = "Enter weight to calculate";
    }

    if (result < 0) {
      result = 0;
    }

    setResult(result);
    setError(error);
  }

  if (result <= 0.5) {
    resultColor = '#238823';
  } else if (result <= 1.2 ) {
    resultColor = '#ffbf00'
  } else {
    resultColor = '#d2222d'
  }

  return (
    <ScrollView>
      <View style={myStyle.container}>
        <Text style={myStyle.heading} variant="displayMedium">Alcometer</Text>
        <Text style={myStyle.label}>Weight</Text>
        <TextInput
          style={myStyle.textInput}
          mode='outlined' 
          keyboardType='numeric' 
          onChangeText={val => setWeight(val)}
        />
        <Text style={myStyle.label}>Bottles</Text>
        <NumericInput
          minValue={0} 
          onChange={val => setBottles(val)}
          rounded
          rightButtonBackgroundColor={'#a46ed9'}
          leftButtonBackgroundColor={'#a46ed9'}
          textColor= {color}
        />
        <Text style={myStyle.label}>Hours</Text>
        <NumericInput 
          minValue={0} 
          onChange={val => setHours(val)}
          rounded
          rightButtonBackgroundColor={'#a46ed9'}
          leftButtonBackgroundColor={'#a46ed9'}
          textColor= {color}
          
        />
        <RadioButton.Group onValueChange={newValue => setGender(newValue)} value={gender}>
          <View style={myStyle.radiobutton}>
            <RadioButton 
              value='female'
              color='#a46ed9'
              uncheckedColor='#a46ed9'
            />
            <Text style={myStyle.label}>Female</Text>
          </View>
          <View style={myStyle.radiobutton}>
            <RadioButton
              value='male'
              color='#a46ed9'
              uncheckedColor='#a46ed9'
            />
            <Text style={myStyle.label}>Male</Text>
          </View>
        </RadioButton.Group>
        {error === ''
          ? <Text style={[myStyle.result, {color: resultColor}]}>{result.toFixed(2)} ‰</Text>
          : <Text style={myStyle.error}>{error}</Text>}
        <Pressable style={myStyle.button} onPress={calculate}>
          <Text style={myStyle.label}>Calculate</Text>
        </Pressable>
        <Switch
          value={darkTheme}
          onValueChange={() => setDarkTheme(!darkTheme)}
          trackColor={{true: '#a46ed9', false: '#a46ed9'}}
        />
        <Text style={myStyle.label}>Dark theme on/off</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 90,
    paddingBottom: 50,
    flex: 1,
    backgroundColor: '#f8f2ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    color: '#000000'
  },
  textInput: {
    width: 150,
    alignItems: 'center',
  },
  radiobutton: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5
  },
  label: {
    fontSize: 20,
    marginTop: 7,
    marginBottom: 4
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 50,
    backgroundColor: '#a46ed9',
    borderRadius: 7,
    margin: 30
  },
  result: {
    fontSize: 30,
    marginTop: 25
  },
  error: {
    fontSize: 20,
    color: 'red',
    marginTop: 25
  }
});

const darkStyles = StyleSheet.create({
  container: {
    paddingTop: 90,
    paddingBottom: 50,
    flex: 1,
    backgroundColor: '#341b50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    color: '#ffffff'
  },
  textInput: {
    width: 150,
    alignItems: 'center'
  },
  radiobutton: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5
  },
  label: {
    fontSize: 20,
    marginTop: 7,
    marginBottom: 4,
    color: '#ffffff'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 50,
    backgroundColor: '#a46ed9',
    borderRadius: 7,
    margin: 30
  },
  result: {
    fontSize: 30,
    marginTop: 25,
    color: '#ffffff'
  },
  error: {
    fontSize: 20,
    color: 'red',
    marginTop: 25
  }
})
