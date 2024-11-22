import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function Select({ value, funtion }) {

    return (
        <View className="bg-slate-200 w-40 block">
            <Picker selectedValue={value} onValueChange={(itemValue) => funtion(itemValue)}>
                <Picker.Item label="2" value="2" />
                <Picker.Item label="5" value="5" />
                <Picker.Item label="7" value="7" />
                <Picker.Item label="10" value="10" />
            </Picker>
        </View>
    );
};

