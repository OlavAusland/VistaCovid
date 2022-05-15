import { useState } from "react";
import React, { Alert, Button, Modal, SafeAreaView, ScrollView, TextInput, View, Text, Pressable } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { addUser } from '../../api/firebaseAPI';
import { User, Roles } from '../../domain/UserType';
import { dropdownStyles } from '../../styles/dropdownStyle';
import { DropDownType} from '../../domain/DropDownType';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";



export function ManageRoles(){

    const [user, setUser] = useState<User>({
        email:'',  password:'', firstName:'', 
        lastName:'', role:Roles.NONE, address:undefined,
        phone: undefined, city: undefined, code: undefined
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
                    <Text>
                        Manage users
                    </Text>
                </View>
                <View>
                    
                </View>
            </SafeAreaView>
        </ScrollView>

    );
}