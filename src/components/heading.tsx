import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { hp } from '../utils/responsive'

const Heading = ({props}) => {
    // console.log("object------",props)
  return (
   <Text style={styles.heading}>{props}</Text>
  )
}

export default Heading

const styles = StyleSheet.create({
    heading:{
        fontSize: 23,marginBottom:hp(1.3),
        fontFamily:"MonaSans-SemiBold"
        // fontFamily:"MonaSans-Regular"
    }
})