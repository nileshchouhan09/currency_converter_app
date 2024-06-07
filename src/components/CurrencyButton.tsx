import { StyleSheet, Text, View } from 'react-native'
import type { PropsWithChildren } from 'react'
import React from 'react'
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace'

type props = PropsWithChildren<{
    name:string,
    flag:string,
}>


const CurrencyButton = (props:props):JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.flag}>{props.flag}</Text>
      <Text style={styles.name}>{props.name}</Text>
    </View>
  )
}

export default CurrencyButton

const styles = StyleSheet.create({
    container:{
        alignItems:"center",
        margin:15
    },
    flag:{
        fontSize:25,
        marginBottom:5,
    },
    name:{
        fontSize:14,
        marginBottom:5,
    }
})