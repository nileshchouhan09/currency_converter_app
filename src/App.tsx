import {FlatList, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import Button from './components/CurrencyButton';
import {currencyByRupee} from './constants';
import Snackbar from 'react-native-snackbar';
import CurrencyButton from './components/CurrencyButton';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';

const App = () => {
  const [inputValue, setinputValue] = useState('');
  const [result, setresult] = useState('');
  const [targetCurrency, settargetCurrency] = useState('');

  const buttonPressed = (targetValue: Currency) => {
    if (!inputValue) {
      return Snackbar.show({
        text: 'Enter a number',
        backgroundColor: '#ffff',
        textColor: 'red',
      });
    }
    const amount = parseFloat(inputValue);
    if (!isNaN(amount)) {
      const convertedValue = amount * targetValue.value;
      const result = `${targetValue.symbol} ${convertedValue}`;
      setresult(result);
      settargetCurrency(targetValue.name);
    } else {
      return Snackbar.show({
        text: 'Not a number',
        backgroundColor: '#fff',
        textColor: '#000',
      });
    }
  };
  return (
    <>
      <Text style={styles.heading}>Currency Converter </Text>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.rupeeContainer}>
            <Text style={styles.rupee}>₹ :</Text>
            <TextInput
            style={styles.input}
            maxLength={16}
            value={inputValue}
            clearButtonMode='always'
            onChangeText={setinputValue}
            keyboardType='number-pad'
            placeholder='Enter Value'            />
          </View>

         {
          result && (
            <Text style={styles.result}>{result}</Text>
          )
         } 
        </View>
        <View style={styles.bottomContainer}>
          <FlatList 
          numColumns={3}
          data={currencyByRupee}
          keyExtractor={(item)=>(item.name)}// can also use id instead but it should be unique
          renderItem={({item})=>(
            <Pressable style={[styles.button,targetCurrency === item.name && styles.selected]}
            onPress={()=>buttonPressed(item)}
            >

          <CurrencyButton {...item}/>

            </Pressable>
          )}          
          />

          
        </View>
      </View>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
   
    flex: 1,
    backgroundColor:"#f5f5f5"
  
  },
  topContainer: {
    alignItems:"center",
    marginTop:20
   
  },
  rupeeContainer: {
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    gap:7,
    borderWidth:1,
    paddingHorizontal:10,
    borderRadius:12,
   

   
  
  },
  rupee:{
    fontSize:23,
    fontWeight:"bold",
    

  },
  input:{
    fontSize:20,
  },
  result:{
    fontSize:20,
    marginTop:20,
    borderWidth:1,
    paddingHorizontal:10,
    paddingVertical:10,
    borderRadius:12,

  },
  button:{
    flex:1,
    margin:10,
    
    borderRadius:10,
    backgroundColor: '#fff',
    elevation:8,
    shadowOffset:{
      height:1,
      width:1
    },
    shadowOpacity:0.2
  },
  selected:{
    backgroundColor:"#c2c2c2"
  },
  heading:{
    fontSize:23,
    margin:5,
    fontWeight:"bold"
  },
  bottomContainer:{
    marginVertical:20,
    flex:3

  }
});
