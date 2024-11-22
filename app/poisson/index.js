import { View, Text } from 'react-native'
import React from 'react'
import Leagues from '../../src/components/Leagues'

export default function Index() {
  return (
    <View>
      <Leagues navigation="poisson" title="SELECCIONE UNA LIGA" />
    </View>
  )
}