import { View, Text, TextInput, Button, Image, TouchableOpacity} from 'react-native';
import { useState, useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParameters } from '../types/NavigationTypes';
import { loginStyle } from '../styles/LoginStyles';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase-config';
import { LoginInfo } from '../types/UserType';

import Icon from 'react-native-vector-icons/AntDesign';
import { isReactNative } from '@firebase/util';


export function LoginView() 
{
    const navigation = useNavigation<NativeStackNavigationProp<StackParameters>>();

    const [user, setUser] = useState<LoginInfo>({displayPassword: true} as LoginInfo);
    const [error, setError] = useState<string>('');

    useEffect(() => {navigation.navigate('VistaCovid', {screen:'Room'});}, []);

    useEffect(() => {console.log(user.displayPassword)}, [user.displayPassword])

    const handleLogin = async() => {
        await signInWithEmailAndPassword(getAuth(), user.email, user.password).then((res) => {
            console.log('Successfully Logged In!');
            navigation.navigate('VistaCovid', {screen: 'Home'});
        }).catch((err) => {console.log('Error! Please Try Again!'); setError(err.message); console.log(err)})
    }


    return(
        <View style={{width:'100%', height:'100%', backgroundColor:'#0274A1'}}>
            <View style={loginStyle.container}>
                <View style={{ width: '100%', borderRadius: 5, backgroundColor: '#FFFFFF', flexDirection: 'row', marginBottom:10}}>
                    <TextInput onChangeText={text => {setUser(prev => ({...prev, email:text}))}} placeholder="Email" style={{height: 40,  paddingLeft:10, width:'100%'}}/>
                </View>
                <View style={{ width: '100%', borderRadius: 5, backgroundColor: '#FFFFFF', flexDirection: 'row' }}>
                    <TextInput secureTextEntry={user.displayPassword} onChangeText={text => {setUser(prev => ({...prev, password:text}))}} placeholder="Password" style={{height: 40, paddingLeft:10, width:'100%'}}/>
                    <View style={{ height: 40}}>
                        <TouchableOpacity style={{height:'100%', alignSelf:'center', paddingRight:10, paddingTop:6, paddingLeft:10 }}>
                            <Icon name="eye" size={25} color="#AAAAAA" onPress={() => {console.log('tried to change!'); setUser({...user, displayPassword: !user.displayPassword})}}/>
                        </TouchableOpacity>
                    </View>
                </View>         
                <Button title="Login" onPress={() => {handleLogin()} }/>
                <Button title="Register" onPress={() => {navigation.navigate('Register')} }/>
                <Image style={{height:300}} source={require('../assets/images/HeartLoading.gif')}></Image>
            </View>
        </View>
    );
}