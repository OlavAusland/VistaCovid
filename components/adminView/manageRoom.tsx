import React, { Alert, Button, Modal, SafeAreaView, ScrollView, TextInput, View, Text, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { deleteRoom, getRooms } from "../../api/firebaseAPI";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParameters } from "../../domain/NavigationTypes";
import { adminStyle } from "../../styles/AdminStyles";
import {DeleteRoomModal} from "./deleteModal";
import {Room} from "../../domain/RoomType"

export function ManageRoom()
{
    const navigation = useNavigation<NativeStackNavigationProp<StackParameters>>();

    const [delRoomNumber, setDelRoomNumber] = useState('')

    const [modalVisible, setModalVisible] = useState(false);

    const handleCloseDeleteRoomModal = () => {

        setModalVisible(false);
    }

    const DeleteRoom = () => {
        console.log('Delet rooomomomo')
        console.log(delRoomNumber)
        deleteRoom(delRoomNumber)

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