
import { SearchBar } from 'react-native-elements';
import { manageUsersStyles } from '../../styles/ManageUsersStyles';


// navigation
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { deleteUserById, getUsers } from "../../api/firebaseAPI";
import { ErrorType } from "../../domain/Errortype";
import { StackParameters } from '../../domain/NavigationTypes';
import { User } from "../../domain/UserType";
import { Errormodal } from "../ErrorModal";


export function ManageUsers(){
    const [users, setUsers] = useState<User[]>([])
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
            <View style={[manageUsersStyles.header, manageUsersStyles.shadow]}>
                <TextInput
                    placeholder="room number"
                    style={manageUsersStyles.search}/>
            </View>
            <ScrollView contentContainerStyle={{alignItems:'center'}}>
                {users.map((user) => {
                    return(
                        <View  key={'users' + user.id} style={manageUsersStyles.cardContainer}>
                            <View style={manageUsersStyles.card}>
                                <Icon style={{alignSelf:'center'}} name='clipboard' size={80}/>
                                <Text style={{flex:1}}>User: {user.firstName} {user.lastName}</Text>
                                <Text style={{flex:1}}>ID: {user.id}</Text>
                            </View>
                        </View>
                    );
                })}
            </ScrollView>
        </SafeAreaView>
    );
}
