import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Vibration} from 'react-native';
import {useState} from 'react';

export default function App() {
  const [currentNumber, setCurrentNumber] = useState('');
  const [lastNumber, setLastNumber] = useState('');

  const buttons = ['(',')','←','C', 7, 8, 9, '/', 4, 5, 6,'*', 1, 2, 3,'-', 0, '.','+', '=',]

  function calculator() {
    let lastArr = currentNumber[currentNumber.length-1];
    
    if(lastArr === '/' || lastArr === '*' || lastArr === '-' || lastArr === '+' ) {
      setCurrentNumber(currentNumber.substring(0, (currentNumber.length - 1)))
      setLastNumber('bieu thuc ko hop le!')
      return
    }
    else {
      let result = eval(currentNumber).toString();
      setCurrentNumber(result)
      return
    }
  }

  function handleInput(buttonPressed) {
    if(buttonPressed  === '+' || buttonPressed === '-' || buttonPressed === '*' || buttonPressed === '/') {
      Vibration.vibrate(35);
      setCurrentNumber(currentNumber + buttonPressed);
      return
    }
    else if (buttonPressed === 1 || buttonPressed === 2 || buttonPressed === 3 || buttonPressed === 4 || buttonPressed === 5 ||
            buttonPressed === 6 || buttonPressed === 7 || buttonPressed === 8 || buttonPressed === 9 || buttonPressed === 0 || buttonPressed === '.' ) {
      Vibration.vibrate(35);
    }
    switch(buttonPressed) {
      case '←':
        Vibration.vibrate(35);
        setCurrentNumber(currentNumber.substring(0, (currentNumber.length - 1)))
        return
      case 'C':
        Vibration.vibrate(35);
        setLastNumber('')
        setCurrentNumber('')
        return
      case '=':
        Vibration.vibrate(35);
        setLastNumber(currentNumber + '=')
        calculator()
        return
    }
    setCurrentNumber(currentNumber + buttonPressed)
    
  }
  return(
    <View>
      <View style={styles.results}>
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
      </View>
      <View style={styles.buttons}>
        {buttons.map((button) =>
          button === '/' || button === '*' || button === '-' || button === '+' ?
          <TouchableOpacity key={button} style={[styles.button, {backgroundColor: '#5bb0a2'} ]} onPress={() => handleInput(button)}>
            <Text style={[styles.textButton, {color: 'white', fontSize: 28} ]}>{button}</Text>
          </TouchableOpacity>
          :
          button === 0 ?
          <TouchableOpacity key={button} style={[styles.button, {backgroundColor: typeof(button) === 'number' ? '#e6faf7' : '#9dcfc8' , minWidth: '48%'} ]} onPress={() => handleInput(button)}>
            <Text style={styles.textButton}>{button}</Text>
          </TouchableOpacity>
          :
          button === '=' ? // || button === '←' ?
          <TouchableOpacity key={button} style={[styles.button, {backgroundColor: '#9dcfc8', minWidth: '48%'} ]} onPress={() => handleInput(button)}>
            <Text style={[styles.textButton, {color: 'white', fontSize: 28} ]}>{button}</Text>
          </TouchableOpacity>
          :
          button === 'C' || button === '←'?
          <TouchableOpacity key={button} style={[styles.button, {backgroundColor: '#c9897f'} ]} onPress={() => handleInput(button)}>
            <Text style={[styles.textButton, {color: 'white', fontSize: 26}]}>{button}</Text>
          </TouchableOpacity>
          :
          <TouchableOpacity key={button} style={[styles.button, {backgroundColor: typeof(button) === 'number' || button === '.' ? '#e6faf7' : '#9dcfc8' } ]} onPress={() => handleInput(button)}>
            <Text style={styles.textButton}>{button}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  results: {
    maxWidth: '100%',
    minHeight: '35%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  resultText: {
    maxHeight: 45,
    color: '#00b9d6',
    margin: 15,
    fontSize: 35,
  },
  historyText: {
    fontSize: 20,
    marginRight: 10,
    alignSelf: 'flex-end',
  },
  buttons: {
    width: '100%',
    height: '35%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '24%',
    minHeight: '40%',
    flex: 2,
    margin: 1,
    borderRadius: 30,
  },
  textButton: {
    fontSize: 24,
  }
})