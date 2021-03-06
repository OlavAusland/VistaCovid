import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// * AUTH
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { DropDownType } from '../domain/DropDownType';
import { ErrorType } from '../domain/Errortype';
import { StackParameters } from '../domain/NavigationTypes';
import { Roles, User } from '../domain/UserType';
import { auth, db } from '../firebase-config';
import { dropdownStyles } from '../styles/dropdownStyle';
import { registerStyle } from '../styles/RegisterStyles';
import { SafetyModal } from './register/SafetyModal';



export function RegisterView()
{
    const navigation = useNavigation<NativeStackNavigationProp<StackParameters>>();

    // * USERS
    const [user, setUser] = useState<User>({
        email:'',  password:'', firstName:'', 
        lastName:'', role:Roles.NONE, address:undefined,
        phone: undefined, city: undefined, code: undefined,
        id: '',
    });

    const [error, setError] = useState<ErrorType>({errorObject:undefined, errormodalVisible:false});
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [dropdown, setDropdown] = useState<DropDownType>({ 
        open: false, 
        value: "0", 
        items: [
            { label: 'Nurse', value: '1' },
            { label: 'Doctor', value: '2' }],
        label: "" });
   

    const handleRegister = async() => {
        await createUserWithEmailAndPassword(auth, user.email, user.password).then(async(res) => {
            console.log(res.user.uid    )
            await updateProfile(res.user, {displayName: user.firstName + " " + user.lastName}).then((res) => {
                console.log('Profile Updated');
            }).catch((err) => {});

            await setDoc(doc(db, 'User', res.user.uid), {role: Roles[parseInt(user.role.toString())]}).then((res) => {
                console.log('Added User Role');
            }).catch((err) => {console.log(err)});

            console.log('Successfully Created User!');
            
            await signOut(auth).then().catch((err) => {console.log(err)});
        }).catch((err) => {console.log('Error! Please Try Again!'); setError(err.message)})

    }

    const handleRequestClose = () => {
        setModalVisible(false);
        setError((prev) =>({...prev,errorObject:undefined, errormodalVisible:false}));
    }

    const handleConfirmation = (email: string, password: string) => {
        signInWithEmailAndPassword(auth, email, password).then(() =>{
            handleRegister().then(() => {signInWithEmailAndPassword(auth, email, password).then(() => {
                console.log('Successfully Signed In!');
                console.log(auth.currentUser?.uid)
                }).catch((err) => { setError((prev) =>({...prev, errorObject:err, errormodalVisible:true}))});
            }).catch((err) => { setError((prev) =>({...prev, errorObject:err, errormodalVisible:true}))});
        }).catch((err) => { setError((prev) =>({...prev, errorObject:err, errormodalVisible:true}))});
    }


    //create simple register form using firebase auth
    return(
        <View style={registerStyle.container}>
            <SafetyModal modalVisible={modalVisible} handleRequestClose={handleRequestClose} handleConfirmation={handleConfirmation}/>
            <Text>Register</Text>
            <TextInput onChangeText={text => setUser(prev => ({...prev, email:text}))} placeholder="Email" style={{height: 40, borderColor: 'gray', borderWidth: 1}}/>
            <TextInput onChangeText={text => setUser(prev => ({...prev, password:text}))} placeholder="Password" style={{height: 40, borderColor: 'gray', borderWidth: 1}}/>
            <TextInput onChangeText={text => setUser(prev => ({...prev, confirmedPassword:text}))} placeholder="Confirm Password" style={{height: 40, borderColor: 'gray', borderWidth: 1}}/>
            <TextInput onChangeText={text => setUser(prev => ({...prev, firstName:text}))} placeholder="First Name" style={{height: 40, borderColor: 'gray', borderWidth: 1}}/>
            <TextInput onChangeText={text => setUser(prev => ({...prev, lastName:text}))} placeholder="Last Name" style={{height: 40, borderColor: 'gray', borderWidth: 1}}/>
            <TextInput onChangeText={text => setUser(prev => ({...prev, phone:text}))} placeholder="Phone Number" style={{height: 40, borderColor: 'gray', borderWidth: 1}}/>
            <TextInput onChangeText={text => setUser(prev => ({...prev, address:text}))} placeholder="Address" style={{height: 40, borderColor: 'gray', borderWidth: 1}}/>
            <TextInput onChangeText={text => setUser(prev => ({...prev, city:text}))} placeholder="City" style={{height: 40, borderColor: 'gray', borderWidth: 1}}/>
            <Dropdown
                            style={dropdownStyles.dropdown}
                            placeholderStyle={dropdownStyles.placeholderStyle}
                            selectedTextStyle={dropdownStyles.selectedTextStyle}
                            inputSearchStyle={dropdownStyles.inputSearchStyle}
                            iconStyle={dropdownStyles.iconStyle}
                            data={dropdown.items}
                            maxHeight={100}
                            labelField="label"
                            valueField="value"
                            placeholder="Role"
                            value={dropdown.label}
                            onChange={item => {
                                setDropdown(prev => ({ ...prev, label: item.value }))
                                setUser(prev => ({ ...prev, role: item.value }));
                            }}
                            renderLeftIcon={() => (
                                <FontAwesome5 style={dropdownStyles.icon} color="black" name="hospital-user" size={20} />
                            )}
                        />
            <Button title="Create" onPress={() => {setModalVisible(true)}}/>
        </View>
    );
}