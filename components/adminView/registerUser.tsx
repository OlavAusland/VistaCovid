import { useState } from "react";
import React, { Button, SafeAreaView, ScrollView, Text, TextInput, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { DropDownType } from '../../domain/DropDownType';
import { Roles, User } from '../../domain/UserType';
import { dropdownStyles } from '../../styles/dropdownStyle';


export function CreateUser(){
    const [user, setUser] = useState<User>({
        email:'',  password:'', firstName:'', 
        lastName:'', role:Roles.NONE, address:undefined,
        phone: undefined, city: undefined, code: undefined, id:''
    });
    
    const [dropdown, setDropdown] = useState<DropDownType>({ 
        open: false, 
        value: "0", 
        items: [
            { label: 'Nurse', value: '1' },
            { label: 'Doctor', value: '2' }],
        label: "" });


    const CreateUser = () =>{
        
    }

    return(
        <ScrollView>
            <SafeAreaView>
                <View>
                    <Text>Add new user</Text>
                </View>
                <View>
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
                </View> 
                <View>
                    <Button title="Create User" onPress={() => {}}/>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
}