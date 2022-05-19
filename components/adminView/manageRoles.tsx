
// navigation
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { deleteUserById, getUsers } from "../../api/firebaseAPI";
import { ErrorType } from "../../domain/Errortype";
import { User } from "../../domain/UserType";
import { manageRolesStyles } from '../../styles/ManageRolesStyles';
import { Errormodal } from "../ErrorModal";




export function ManageRoles(){

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
