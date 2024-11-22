import { View, Text, Image, ScrollView, Pressable, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { Link, useLocalSearchParams } from 'expo-router'
import Loading from '../../src/components/Loading'
import useLeague from "../../src/hooks/useLegues"
import Select from "../../src/components/select"
import Input from "../../src/components/input"
import { useContext } from 'react'
import { Context } from '../../src/context/contex'

export default function Details() {
    const { selectedValue, setSelectedValue, Team1, Team2, handleClick, reset, handleText, setCode, code } = useContext(Context)
    const { DetailLeague, leaguesDetails } = useLeague()
    const { detalle } = useLocalSearchParams()


    useEffect(() => {
        if (detalle == "PL") {
            setCode('en')
        } else if (detalle == "PD") {
            setCode('es')
        } else if (detalle == "BL1") {
            setCode('de')
        } else if (detalle == "SA") {
            setCode('it')
        } else {
            setCode('fr')
        }
    }, [])
    
    useEffect(() => {
        DetailLeague(detalle);
    }, [detalle])

    useEffect(() => {
        if (leaguesDetails.length > 0) {
        }
    }, [leaguesDetails]);


    return (
        <ScrollView className="mt-10">
            <Text className="font-bold text-2xl mb-10 text-center">DETALLES DE APUESTA</Text>
            <View className="flex-row justify-around items-center mb-10">
                <Text className="w-24">Max Goles</Text>
                <Input funtion={handleText} />
            </View>
            <View className="flex-row justify-around items-center">
                <Text className="w-24">Partidos Anteriores</Text>
                <Select value={selectedValue} funtion={setSelectedValue} />
            </View>
            <View className="flex-row flex-wrap justify-center gap-5 py-10">
                <Text className="font-bold text-2xl mb-5">SELECCIONE DOS EQUIPOS</Text>
                {leaguesDetails.length > 0 ? (
                    leaguesDetails[0].team.map((team, index) => (
                        <Pressable onPress={() => { handleClick(team, leaguesDetails[0].logo[index]) }} key={index}>
                            <View style={Team1 == team || Team2 == team ? styles.card : ""} className='p-3 border border-gray-300 w-28 h-32 justify-center items-center rounded-md'>
                                <Image
                                    source={{ uri: leaguesDetails[0].logo[index] }}
                                    style={{ width: 55, height: 55, marginTop: 5 }}
                                />
                                <Text className="font-bold text-center">{team}</Text>
                            </View>
                        </Pressable>
                    ))
                ) : (
                    <Loading />
                )}
            </View>

            <View className="justify-center mb-10 flex-row">
                <Text className="text-center uppercase font-bold w-44">EQUIPO 1: {Team1}</Text>
                <Text className="text-center uppercase font-bold w-44">EQUIPO 2: {Team2}</Text>
            </View>


            <View className="items-center mb-10 flex-row justify-center gap-3">
                <Pressable onPress={reset} className="bg-slate-500 w-40 p-3 rounded">
                    <Text className="text-center text-white uppercase font-bold">Reset</Text>
                </Pressable>
                <Link href={'/poisson/result'} asChild>
                    <Pressable className="bg-slate-500 w-40 p-3 rounded">
                        <Text className="text-center text-white uppercase font-bold">Siguiente</Text>
                    </Pressable>
                </Link>
            </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    card: {
        backgroundColor: "#d1d5db"
    }
})
