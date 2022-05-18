import { View, Text, TextInput, Button, Image, Pressable, TouchableOpacity, StyleSheet } from 'react-native';
import { useState, useEffect, createContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParameters } from '../domain/NavigationTypes';
import { loginStyle } from '../styles/LoginStyles';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase-config';
import { LoginInfo } from '../domain/UserType';

import Icon from 'react-native-vector-icons/FontAwesome';
import { isReactNative } from '@firebase/util';
import { getRole } from '../api/firebaseAPI';
import { ErrorType } from '../domain/Errortype';
import { Errormodal } from './ErrorModal';




export function LoginView() {
    const navigation = useNavigation<NativeStackNavigationProp<StackParameters>>();

    const [user, setUser] = useState<LoginInfo>({ displayPassword: true } as LoginInfo);
    const [error, setError] = useState<ErrorType>({errorObject:undefined, errormodalVisible:false});

    const handleRequestClose = () => {
        setError((prev) =>({...prev,errorObject:undefined, errormodalVisible:false}));
    }


    useEffect(() => { console.log(user.displayPassword) }, [user.displayPassword])

    const handleLogin = async () => {
        await signInWithEmailAndPassword(getAuth(), user.email, user.password).then((res) => {
            console.log('Successfully Logged In!');
            navigation.navigate('Menu', { screen: 'VistaCovid' });
        }).catch((err) => { setError((prev) =>({...prev, errorObject:err, errormodalVisible:true})); });
    }

    if(error.errormodalVisible){
        return (
            <Errormodal error={error} handleRequestClose={handleRequestClose} />
        )
    }
    return (
        <View style={loginStyle.container}>
            <View style={loginStyle.topLine}>
                <Image style={loginStyle.logo} source={require('../assets/images/vista_covid-removebg-preview.png')}></Image>
            </View>
            <View style={loginStyle.inputBar}>
                    <View style={loginStyle.icons}>
                        <Icon name="envelope" size={30} color="#0274a1" />
                    </View>
                    <TextInput onChangeText={text => { setUser(prev => ({ ...prev, email: text })) }} placeholder="Email" style={loginStyle.input } />
            </View>
            <View style={loginStyle.bottomLine}>
                <View style={loginStyle.inputBar}>
                    <View style={loginStyle.icons}>
                        <Icon name="key" size={30} color="#0274a1" />
                    </View>
                    <TextInput secureTextEntry={user.displayPassword} onChangeText={text => { setUser(prev => ({ ...prev, password: text })) }} placeholder="Password" style={loginStyle.input} />
                    <View style={{ height: 40 }}>
                        <TouchableOpacity style={loginStyle.eyeIcon}>
                            <Icon name="eye" size={25} color="#0274a1" onPress={() => { console.log('tried to change!'); setUser({ ...user, displayPassword: !user.displayPassword }) }} />
                        </TouchableOpacity>
                    </View>
                </View>         
            </View>
            {/*error && <Text style={{ color: 'rgb(255, 0, 0)', fontSize: 18, alignSelf: 'center' }}>{error}</Text>*/}
            <View style={loginStyle.loginLogo}>
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


