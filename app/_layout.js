import React from 'react'
import { Stack } from "expo-router"

export default function Layout() {
  return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: true }} />
        {/* <Stack.Screen name="init" options={{ headerShown: true }} /> */}
        <Stack.Screen name="[id]" options={{ headerShown: true }} />
      </Stack>
  )
}