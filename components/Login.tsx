import { View, Text } from 'react-native';
import { useState, useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParameters } from '../types/NavigationTypes';

export function LoginView() 
{
    const navigation = useNavigation<NativeStackNavigationProp<StackParameters>>();

    useEffect(() => {navigation.navigate('VistaCovid', {screen: 'Profile'})}, [])

    return(
        <View>
            <Text>Login</Text>
        </View>
    );
}