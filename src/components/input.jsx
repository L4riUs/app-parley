import { View, Text, TextInput } from 'react-native'
import React from 'react'

export default function input({funtion}) {
  return (
    <TextInput 
    className="border w-40 border-gray-300" onChangeText={(e)=>{funtion(e)}}/>
  )
}