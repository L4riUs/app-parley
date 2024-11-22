import { View, Text, Pressable } from 'react-native'
import React from 'react'

export default function error({ msj, funtion }) {
    return (
        <View className="items-center justify-center h-full">
            <Text>{msj}</Text>
            <Pressable onPress={()=>{funtion()}} className="bg-slate-500 p-2 rounded-md mt-5">
                <Text className="text-white">Reintentar</Text>
            </Pressable>
        </View>
    )
}