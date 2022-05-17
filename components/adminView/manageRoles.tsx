import { useEffect, useState } from "react";
import React, { Alert, Button, Modal, SafeAreaView, ScrollView, TextInput, View, Text, Pressable, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { SearchBar } from 'react-native-elements';

// navigation
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParameters } from '../../domain/NavigationTypes';
import { adminStyle } from "../../styles/AdminStyles";
import { Room } from "../../domain/RoomType";
import { User } from "../../domain/UserType";
import { deletePatient, getUsers, deleteUserById } from "../../api/firebaseAPI";
import { roomStyle } from "../../styles/RoomStyles";
import { isPropertySignature } from "typescript";
import { ErrorType } from "../../domain/Errortype";
import { Errormodal } from "../ErrorModal";
import Icon from "react-native-vector-icons/Feather";

export function ManageRoles(){

    const navigation = useNavigation<NativeStackNavigationProp<StackParameters>>();

    const [searchWord, setSearchWord] = useState("");
    const [users, setUsers] = useState<User[]>([])
    const [search, setSearch] = useState<string>('');
    const [error, setError] = useState<ErrorType>({errorObject:undefined, errormodalVisible:false});

    const handleRequestClose = () => {
        setError((prev) =>({...prev,errorObject:undefined, errormodalVisible:false}));
    }

    useEffect(() => {
        const getUserData = async () =>{
            await getUsers().then((res) => {
                setUsers(res);
            }).catch((err) => { setError((prev) =>({...prev, errorObject:err, errormodalVisible:true})); });
        };
        getUserData();
    }, []);

    if(error.errormodalVisible){
        return (
            <Errormodal error={error} handleRequestClose={handleRequestClose} />
        )
    }

    return(
        <SafeAreaView style={{flex:1}}>
            <View style={[styles.header, styles.shadow]}>
                <TextInput
                    placeholder="room number"
                    onChangeText={(text) => {setSearch(text)}}
                    style={styles.search}/>
            </View>
            <ScrollView contentContainerStyle={{flex:1, alignItems:'center'}}>
                {users.map((user) => {
                    return(
                        <View  key={'users' + user.id} style={styles.cardContainer}>
                            <View style={styles.card}>
                                <Icon style={{alignSelf:'center'}} name='clipboard' size={80}/>
                                <Text style={{flex:1}}>Patient: {user.id}</Text>
                            </View>
                            <TouchableOpacity onPress={() =>{deleteUserById(user.id)}} style={styles.delete}>
                                <Icon name='trash-2' color={'white'} size={40}/>
                            </TouchableOpacity>
                        </View>
                    );
                })}
            </ScrollView>
        </SafeAreaView>
    );
}

export const styles = StyleSheet.create({
    header:{
        backgroundColor:'white',
        paddingTop:40,
        paddingBottom:10
    },
    delete: {
        backgroundColor:'red', 
        flexBasis:'15%', 
        height:100, 
        justifyContent:'center', 
        alignItems:'center', 
        shadowColor: "#000", 
        shadowOffset: { width: 0,height: 3},
        shadowOpacity: 0.27,
        shadowRadius: 4.65, 
        elevation: 6
    },
    cardContainer:{
        width:'90%',
        marginTop:25,
        flexDirection:'row', 
        justifyContent:'space-between', 
        alignItems:'center', 
    },
    shadow:{
        shadowColor: "#000", 
        shadowOffset: { width: 0,height: 3,},
        shadowOpacity: 0.27,
        shadowRadius: 4.65, 
        elevation: 6
    },
    card: {
        flexDirection:'row', 
        backgroundColor:'#79CAED', 
        flexBasis:'84%', 
        height:100, 
        justifyContent:'center', 
        shadowColor: "#000", 
        shadowOffset: { width: 0,height: 3,},
        shadowOpacity: 0.27,
        shadowRadius: 4.65, 
        elevation: 6
    },
    add:{
        marginTop:25,
        backgroundColor:'white',
        width:'90%',
        height:75,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10
    },
    search:{
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderRadius:10,
        padding: 10,
    }
})