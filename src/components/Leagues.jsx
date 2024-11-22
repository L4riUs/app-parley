import { Text, View, Pressable, ImageBackground } from 'react-native';
import UseLeagues from '../hooks/useLegues'
import { useEffect } from 'react';
import { Link } from 'expo-router';
import { PlusIcon } from "./icons"
import Loading from './Loading';
import Error from './error';

export default function Leagues({ navigation, title }) {

    const { ViewLeagues, leagues, loading, error, errorStatus } = UseLeagues();

    useEffect(() => {
        ViewLeagues();
    }, []);

    if (loading) {
        return <Loading />
    }
    else if (errorStatus) {
        return <Error msj={error} funtion={ViewLeagues} />
    } else {
        return (
            <View className="relative">
                <Text className="pt-10 pl-5 font-extrabold text-xl font-mono">{title}</Text>
                <View className="flex-row flex-wrap justify-center gap-10 pt-10">
                    {
                        leagues.map((item, index) => (
                            <Link href={navigation == "general" ? `/${item.id}` : `/poisson/${item.id}`} asChild key={index}>
                                <Pressable className="p-4 items-center bg-gray-200 rounded-lg active:selection:border border-red-600">
                                    <ImageBackground source={{ uri: item.emblem }} className="w-28 h-28 mr-3" />
                                </Pressable>
                            </Link>
                        ))
                    }
                </View>
            </View>
        )
    }
}