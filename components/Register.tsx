import { View, Text, TextInput, Button } from 'react-native';
import React,{ useState, useEffect} from 'react';
import { registerStyle } from '../styles/RegisterStyles';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParameters } from '../domain/NavigationTypes';

import { User, Roles} from '../domain/UserType';

// * AUTH
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase-config'

export function RegisterView()
{
    const navigation = useNavigation<NativeStackNavigationProp<StackParameters>>();

    // * USERS
    const [user, setUser] = useState<User>({
        email:'',  password:'', firstName:'', 
        lastName:'', role:Roles.NONE, address:undefined,
        phone: undefined, city: undefined, code: undefined
    });

    const [error, setError] = useState<string>('');

   

    const handleRegister = async() => {
        await createUserWithEmailAndPassword(auth, user.email, user.password).then((res) => {
            console.log('Successfully Created User!');
            navigation.navigate('Login');
        }).catch((err) => {console.log('Error! Please Try Again!'); setError(err.message)})
    
    }

    //create simple register form using firebase auth
    return(
        <View style={registerStyle.container}>
            <Text>Register</Text>
            <TextInput onChangeText={text => setUser(prev => ({...prev, email:text}))} placeholder="Email" style={{height: 40, borderColor: 'gray', borderWidth: 1}}/>
            <TextInput onChangeText={text => setUser(prev => ({...prev, password:text}))} placeholder="Password" style={{height: 40, borderColor: 'gray', borderWidth: 1}}/>
            <TextInput onChangeText={text => setUser(prev => ({...prev, confirmedPassword:text}))} placeholder="Confirm Password" style={{height: 40, borderColor: 'gray', borderWidth: 1}}/>
            <TextInput onChangeText={text => setUser(prev => ({...prev, firstName:text}))} placeholder="First Name" style={{height: 40, borderColor: 'gray', borderWidth: 1}}/>
            <TextInput onChangeText={text => setUser(prev => ({...prev, lastName:text}))} placeholder="Last Name" style={{height: 40, borderColor: 'gray', borderWidth: 1}}/>
            <TextInput onChangeText={text => setUser(prev => ({...prev, phone:text}))} placeholder="Phone Number" style={{height: 40, borderColor: 'gray', borderWidth: 1}}/>
            <TextInput onChangeText={text => setUser(prev => ({...prev, address:text}))} placeholder="Address" style={{height: 40, borderColor: 'gray', borderWidth: 1}}/>
            <TextInput onChangeText={text => setUser(prev => ({...prev, city:text}))} placeholder="City" style={{height: 40, borderColor: 'gray', borderWidth: 1}}/>
            <Button title="Register" onPress={() => {handleRegister()}}/>
            <Button title="Back" onPress={() => {navigation.navigate('Login')} }/>
        </View>
    );
}