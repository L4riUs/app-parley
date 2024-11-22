import { View, Text, Image, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router'
import Loading from '../src/components/Loading'
import useLeague from "../src/hooks/useLegues"

export default function Details() {
    const { DetailLeague, leaguesDetails } = useLeague()
    const { id } = useLocalSearchParams()

    useEffect(() => {
        DetailLeague(id);
    }, [id])

    useEffect(() => {
        if (leaguesDetails.length > 0) {
        }
    }, [leaguesDetails]);


    return (
        <ScrollView>
            <View className="flex-row flex-wrap justify-center gap-5 py-10">
                {leaguesDetails.length > 0 ? (
                    leaguesDetails[0].team.map((team, index) => (
                        <View key={index} className="p-3 border border-gray-300 w-28 justify-center items-center rounded-md">
                            <Image
                                source={{ uri: leaguesDetails[0].logo[index] }}
                                style={{ width: 55, height: 55, marginTop: 5 }}
                            />
                            <Text className="font-bold text-center">{team}</Text>
                        </View>
                    ))
                ) : (
                    <Loading />
                )}
            </View>
        </ScrollView>
    );

}