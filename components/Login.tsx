import { View, Text, TextInput, Button} from 'react-native';
import { useState, useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParameters } from '../types/NavigationTypes';
import { loginStyle } from '../styles/LoginStyles';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase-config';
import { LoginInfo } from '../types/UserType';


export function LoginView() 
{
    const navigation = useNavigation<NativeStackNavigationProp<StackParameters>>();

    const [user, setUser] = useState<LoginInfo>({displayPassword: true} as LoginInfo);
    const [error, setError] = useState<string>('');

    //useEffect(() => {navigation.navigate('VistaCovid', {screen:'Room'});}, []);

    const handleLogin = async() => {
        await signInWithEmailAndPassword(getAuth(), user.email, user.password).then((res) => {
            console.log('Successfully Logged In!');
            navigation.navigate('VistaCovid', {screen: 'Home'});
        }).catch((err) => {console.log('Error! Please Try Again!'); setError(err.message); console.log(err)})
    }


    return(
        <View style={loginStyle.container}>
            <Text>Login</Text>
            <TextInput onChangeText={text => {setUser(prev => ({...prev, email:text}))}} placeholder="Email" style={{height: 40, borderColor: 'gray', borderWidth: 1}}/>
            <TextInput secureTextEntry={user.displayPassword} onChangeText={text => {setUser(prev => ({...prev, password:text}))}} placeholder="Password" style={{height: 40, borderColor: 'gray', borderWidth: 1}}/>
            <Button title="Login" onPress={() => {handleLogin()} }/>
            <Button title="Register" onPress={() => {navigation.navigate('Register')} }/>
        </View>
    );
}