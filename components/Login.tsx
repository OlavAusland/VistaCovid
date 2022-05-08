import { View, Text, TextInput, Button, Image, Pressable, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParameters } from '../domain/NavigationTypes';
import { loginStyle } from '../styles/LoginStyles';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase-config';
import { LoginInfo } from '../domain/UserType';

import Icon from 'react-native-vector-icons/FontAwesome';
import { isReactNative } from '@firebase/util';


export function LoginView() {
    const navigation = useNavigation<NativeStackNavigationProp<StackParameters>>();

    const [user, setUser] = useState<LoginInfo>({ displayPassword: true } as LoginInfo);
    const [error, setError] = useState<string>('');

    // useEffect(() => {navigation.navigate('VistaCovid', {screen:'Room'});}, []);

    useEffect(() => { console.log(user.displayPassword) }, [user.displayPassword])

    const handleLogin = async () => {
        await signInWithEmailAndPassword(getAuth(), user.email, user.password).then((res) => {
            console.log('Successfully Logged In!');
            navigation.navigate('VistaCovid', { screen: 'Home' });
        }).catch((err) => { console.log('Error! Please Try Again!'); setError(err.message); console.log(err) })
    }


    return (
        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: '#FFFFFF' }}>
            <View style={{ marginBottom: 60 }}>
                <Image style={{ height: 270, width: 270 }} source={require('../assets/images/vista_covid-removebg-preview.png')}></Image>
            </View>
            <View style={{ width: '85%', borderRadius: 8, backgroundColor: '#9dd4fb', flexDirection: 'row', marginBottom: 8 }}>
                    <View style={{ height: '85%', marginLeft: 10, marginTop: 3, marginRight: 2 }}>
                        <Icon name="envelope" size={30} color="#0274a1" />
                    </View>
                    <TextInput secureTextEntry={user.displayPassword} onChangeText={text => { setUser(prev => ({ ...prev, password: text })) }} placeholder="Email" style={loginStyle.input } />
                </View>
            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>


                <View style={{ width: '85%', borderRadius: 8, backgroundColor: '#9dd4fb', flexDirection: 'row', marginBottom: 8 }}>
                    <View style={{ height: '85%', marginLeft: 10, marginTop: 3, marginRight: 2 }}>
                        <Icon name="key" size={30} color="#0274a1" />
                    </View>
                    <TextInput secureTextEntry={user.displayPassword} onChangeText={text => { setUser(prev => ({ ...prev, password: text })) }} placeholder="Password" style={loginStyle.input} />
                    <View style={{ height: 40 }}>
                        <TouchableOpacity style={{ height: '100%', alignSelf: 'center', paddingRight: 20, paddingTop: 6 }}>
                            <Icon name="eye" size={25} color="#0274a1" onPress={() => { console.log('tried to change!'); setUser({ ...user, displayPassword: !user.displayPassword }) }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {/*error && <Text style={{ color: 'rgb(255, 0, 0)', fontSize: 18, alignSelf: 'center' }}>{error}</Text>*/}
            <View style={{ width: '85%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor:'#0274a1', borderRadius: 8}}>
                <View style={{ height: '60%'}}>
                    <Icon name="user-o" size={30} color="#FFFFFF" />
                </View>
                <Pressable
                    style={loginStyle.loginButtons}
                    onPress={() => { handleLogin() }}>
                    <Text style={loginStyle.buttontext}>Login</Text>
                </Pressable>
            </View>
            
        </View>
    );
}
