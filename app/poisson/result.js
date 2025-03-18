import { View, Text, Image, ActivityIndicator, Pressable } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../../src/context/contex';
import { Link } from 'expo-router';

export default function Result() {
    const { selectedValue, Team1, Team2, maxGoles, Team1Img, Team2Img, calcular, poisson, code, resetForm } = useContext(Context);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            await calcular(Team1, Team2, maxGoles, selectedValue, code);
            setIsLoading(false);
        };
        fetchData();
    }, [Team1, Team2, maxGoles, selectedValue, code]);

    if (isLoading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <>
            <View className="flex-row justify-around mt-10">
                <View className="justify-center items-center bg-slate-200 p-4 rounded-xl">
                    <Image source={{ uri: Team1Img }} className="w-32 h-32" />
                    <Text className="w-28 text-center mt-5 font-bold ">{Team1}</Text>
                </View>
                <View className="justify-center items-center bg-slate-200 p-4 rounded-xl">
                    <Image source={{ uri: Team2Img }} className="w-32 h-32" />
                    <Text className="w-28 text-center mt-5 font-bold ">{Team2}</Text>
                </View>
            </View>
            <View className="flex-row justify-around mt-10 mx-5">
                <Text className="w-24 text-center text-lg bg-slate-200 rounded">
                    {poisson.probableResult.score.slice(0, 1)}
                </Text>
                <Text className="w-28 text-center font-extrabold text-lg">RESULTADO</Text>
                <Text className="w-24 text-center text-lg bg-slate-200 rounded">
                    {poisson.probableResult.score.slice(2, 3)}
                </Text>
            </View>
            <View className="items-center justify-center mt-16">
                <Text className="text-center text-3xl font-extrabold">PROBABILIDAD</Text>
                <Text className="text-center text-3xl mt-2">{poisson.probableResult.probability}</Text>
            </View>
            <View className="justify-center mt-10 flex-row">
                <View className="items-center">
                    <Text className="w-28 text-center font-black text-lg">GANA</Text>
                    <Text className="w-28 text-center">{Team1}</Text>
                    <Text className="w-16 text-white rounded mt-3 text-center bg-slate-600 p-1">{(parseFloat(poisson.winA) * 100).toFixed(2) + " %"}</Text>
                </View>
                <View className="justify-center items-center">
                    <Text className="w-28 text-center font-black text-lg">EMPATE</Text>
                    <Text className="w-28 text-center"></Text>
                    <Text className="w-16 text-white rounded mt-3 text-center bg-slate-600 p-1">{(parseFloat(poisson.draw) * 100).toFixed(2) + " %"}</Text>
                </View>
                <View className="justify-center items-center">
                    <Text className="w-28 text-center font-black text-lg">GANA</Text>
                    <Text className="w-28 text-center">{Team2}</Text>
                    <Text className="w-16 text-white rounded mt-3 text-center bg-slate-600 p-1">{(parseFloat(poisson.winB) * 100).toFixed(2) + " %"}</Text>
                </View>
            </View>
            <View className="items-center mt-14">
                <Link href={"/"} asChild>
                    <Pressable className='bg-slate-500 w-40 p-3 rounded'>
                        <Text className="text-center text-white uppercase font-bold">VOLVER AL INICIO</Text>
                    </Pressable>
                </Link>
            </View>
        </>
    );
}
