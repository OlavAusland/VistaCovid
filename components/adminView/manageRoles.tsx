import { useEffect, useState } from "react";
import React, { Alert, Button, Modal, SafeAreaView, ScrollView, TextInput, View, Text, Pressable, FlatList, TouchableOpacity } from "react-native";
import { SearchBar } from 'react-native-elements';

// navigation
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParameters } from '../../domain/NavigationTypes';
import { adminStyle } from "../../styles/AdminStyles";
import { Room } from "../../domain/RoomType";
import { User } from "../../domain/UserType";
import { getUsers } from "../../api/firebaseAPI";
import { roomStyle } from "../../styles/RoomStyles";
import { isPropertySignature } from "typescript";

export function ManageRoles(){

    const navigation = useNavigation<NativeStackNavigationProp<StackParameters>>();

    const [searchWord, setSearchWord] = useState("");
    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        const getUserData = async () =>{
            await getUsers().then((res) => {
                setUsers(res);
            }).catch((err) =>{ console.log(err)});
        };
        getUserData();
    }, []);



    return(
        <SafeAreaView>
            <View style={adminStyle.managerolesheader}>
                <Text style={adminStyle.manageRoleText}>
                    Manage users
                </Text>
                <View style={adminStyle.addUserButton}>
                <Button
                title="AddUser"
                onPress={()=> {navigation.navigate('CreateUser')}}
                />
                </View>
                <TextInput 
                onChangeText={(text) => {setSearchWord(text)}} 
                placeholder={"search for user"} style={adminStyle.searchBar}/>
            </View>
            <View>
                <ScrollView contentContainerStyle={adminStyle.body}>
                    {users.length > 0 && users.filter((user)=> {if(user.role.toString(2)){return user}}).map((user: User) => {
                        <TouchableOpacity key={'user' + user.email} onPress={()=> navigation.push('CreateUser')}>
                            <View>
                                <Text>User: {user.firstName} {user.lastName}</Text>
                                <Text>Role: {user.role}</Text>
                            </View>
                        </TouchableOpacity>
                    })
                    }
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}