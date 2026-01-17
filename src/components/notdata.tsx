import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Notdata = ({props}) => {
  return (
    <Text style={{  fontSize: 16,
      color: '#6B7280',
      fontWeight: '500',
    alignSelf:"center",  letterSpacing:0.2,}}>{props}</Text>
  )
}

export default Notdata

const styles = StyleSheet.create({})