import React, { Alert, Button, Modal, SafeAreaView, ScrollView, TextInput, View, Text, Pressable } from "react-native";
import { useState } from "react";
import { deleteRoom, getRooms } from "../../api/firebaseAPI";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParameters } from "../../domain/NavigationTypes";
import { adminStyle } from "../../styles/AdminStyles";
import {DeleteRoomModal} from "./deleteModal";
import { isPropertySignature } from "typescript";
import {Room} from "../../domain/RoomType"

export function ManageRoom()
{
    const navigation = useNavigation<NativeStackNavigationProp<StackParameters>>();

    const [editRoomNumber, setEditRoomNumber] = useState('')
    const [delRoomNumber, setDelRoomNumber] = useState('')

    const [modalVisible, setModalVisible] = useState(false);

    const handleCloseDeleteRoomModal = () => {

        setModalVisible(false);
    }

    const DeleteRoom = () => {
        console.log('Delet rooomomomo')
        console.log(delRoomNumber)
        //get all rooms
        getRooms()
        
        //match room number with room id   
        //check if room is empty
            //if room not empty do not delete

        //then execute delete room function form firebaseAPI

    }

    const DeleteRoomAndClose = () => {
        handleCloseDeleteRoomModal();
        DeleteRoom();
    }

    return(
        <ScrollView>
            <SafeAreaView>
                <View style={adminStyle.header}>
                    <Text style={adminStyle.headertext}>Manage Rooms</Text>
                </View>
                <View style={adminStyle.editRoom}>
                    <TextInput
                    placeholder="room number"
                    onChangeText={setEditRoomNumber}
                    style={adminStyle.editRoomNumber}/>
                    <View style={adminStyle.editRoomButton}>
                        <Button title="Edit room" onPress={()=>navigation.navigate("EditRoom")}/>
                    </View>
                </View>

                <View style={adminStyle.deleteRoom}>
                    <TextInput
                    placeholder="room number"
                    onChangeText={setDelRoomNumber}
                    style={adminStyle.deleteRoomNumber}/>
                    <View style={adminStyle.deleteRoomButton}>
                        <Button title="DeleteRoom" onPress={()=>setModalVisible(true)}/>
                    </View>
                </View>
                <DeleteRoomModal modalVisible={modalVisible} handleRequestClose={handleCloseDeleteRoomModal} deleteRoomAndClose={DeleteRoomAndClose}></DeleteRoomModal> 
            </SafeAreaView>
        </ScrollView>
    );
}