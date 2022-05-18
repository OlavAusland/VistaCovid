import { useEffect, useState } from "react";
import { Alert, Button, Modal, SafeAreaView, ScrollView, TextInput, View, Text, Pressable, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { SearchBar } from 'react-native-elements';
import { manageRolesStyles } from '../../styles/ManageRolesStyles';


// navigation
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParameters } from '../../domain/NavigationTypes';
import { User } from "../../domain/UserType";
import { getUsers, deleteUserById } from "../../api/firebaseAPI";
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
            <View style={[manageRolesStyles.header, manageRolesStyles.shadow]}>
                <TextInput
                    placeholder="room number"
                    onChangeText={(text) => {setSearch(text)}}
                    style={manageRolesStyles.search}/>
            </View>
            <ScrollView contentContainerStyle={{flex:1, alignItems:'center'}}>
                {users.map((user) => {
                    return(
                        <View  key={'users' + user.id} style={manageRolesStyles.cardContainer}>
                            <View style={manageRolesStyles.card}>
                                <Icon style={{alignSelf:'center'}} name='clipboard' size={80}/>
                                <Text style={{flex:1}}>Patient: {user.id}</Text>
                            </View>
                            <TouchableOpacity onPress={() =>{deleteUserById(user.id)}} style={manageRolesStyles.delete}>
                                <Icon name='trash-2' color={'white'} size={40}/>
                            </TouchableOpacity>
                        </View>
                    );
                })}
            </ScrollView>
        </SafeAreaView>
    );
}
