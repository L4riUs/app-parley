import React from 'react'
import {Stack} from "expo-router"
import UsePoisson from '../../src/hooks/usePoisson'

export default function Layout2() {
  return (
    <UsePoisson>
      <Stack/>
    </UsePoisson>
  )
}