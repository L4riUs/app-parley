import { StatusBar } from 'expo-status-bar';
import { View, Pressable } from 'react-native';
import Leagues from "../src/components/Leagues"
import { Link } from 'expo-router';
import { PlusIcon } from "../src/components/icons"

export default function Index() {
  return (
    <View>
      <Leagues navigation="general" title="LIGAS DISPONIBLES" />
      <StatusBar style="auto" />
      <Link href="/poisson/" asChild>
        <Pressable className="w-14 h-14 items-center justify-center bg-slate-500 rounded-full absolute right-8 active:bg-slate-700" style={{ top: 600 }}>
          <PlusIcon color="white" />
        </Pressable>
      </Link>
    </View>
  );
}