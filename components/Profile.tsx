import { View, TouchableOpacity, Text, Image } from "react-native"
import React, { useReducer, useState } from "react"
import Icon from 'react-native-vector-icons/Fontisto';
import { auth } from "../firebase-config";

export const ProfileView = () => {
    const [modalVisible, setModalVisible] = useState(false);
   
    const handleRequestClose = () => {
        setModalVisible(false);
    }
    return (
        <View style={{flex:1}}>
            <View style={{flex:1, justifyContent:'center', alignItems:'center', flexDirection:"row"}}>
                <Image
                    style={{ flex:1, width:200,height:200, borderRadius:100}}
                    source={require('../assets/images/CoolDoctor.jpg')}
                />
                <View style={{flex:1, flexDirection:'column', justifyContent:'center'}}>
                    <Text style={{flex:1, marginTop:50}}>Name: {auth.currentUser?.displayName}</Text>
                    <Text style={{flex:1}}>Email: {auth.currentUser?.email}</Text>
                </View>
            </View>
            <View style={{flex:1, backgroundColor:'grey'}}>
                <Text>{auth.currentUser?.displayName}</Text>
            </View>
            <View style={{flex:1, backgroundColor:'black'}}>
                <Text>{auth.currentUser?.displayName}</Text>
            </View>
        </View>
    )
}