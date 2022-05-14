import { useEffect, useState } from "react";
import React, { Alert, Button, Modal, SafeAreaView, ScrollView, TextInput, View, Text, Pressable, FlatList } from "react-native";
import { SearchBar } from 'react-native-elements';

// navigation
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParameters } from '../../domain/NavigationTypes';
import { adminStyle } from "../../styles/AdminStyles";
import { Room } from "../../domain/RoomType";
import { User } from "../../domain/UserType";

export function ManageRoles(){

    const navigation = useNavigation<NativeStackNavigationProp<StackParameters>>();

    const [searchWord, setSearchWord] = useState("");
    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        const getUserData = async () =>{

        }
    })

    return(
        <SafeAreaView>
            <View>
                <Text>
                    Manage users
                </Text>
            </View>
            <View>
                <Button
                title="AddUser"
                onPress={()=> {navigation.navigate('CreateUser')}}
                />
            </View>
            <View style={adminStyle.managerolesheader}>
                <TextInput onChangeText={(text) => {setSearchWord(text)}} placeholder={"search for user"} style={adminStyle.searchBar}/>
            </View>
            <View>
                <ScrollView>

                </ScrollView>
            </View>
        </SafeAreaView>
    );
}