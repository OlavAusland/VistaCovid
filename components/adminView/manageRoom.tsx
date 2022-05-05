import { Alert, Button, Modal, SafeAreaView, ScrollView, TextInput, View, Text, Pressable } from "react-native";
import { useState } from "react";
import { deleteRoom } from "../../api/firebaseAPI";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParameters } from "../../domain/NavigationTypes";
import { adminStyle } from "../../styles/AdminStyles";
import  handleDelete from "./deleteModal"

export function ManageRoom()
{
    const navigation = useNavigation<NativeStackNavigationProp<StackParameters>>();

    const [roomNumber, setRoomNumber] = useState('')
    const [delroomNumber, setDelRoomNumber] = useState('')



    return(
        <ScrollView>
            <SafeAreaView>
                <View style={adminStyle.editRoom}>
                    <TextInput
                    placeholder="room number"
                    onChangeText={setRoomNumber}/>
                    <View style={adminStyle.manageRoomButtons}>
                        <Button title="Edit room" onPress={()=>navigation.navigate("EditRoom")}/>
                    </View>
                </View>

                <View style={adminStyle.deleteRoom}>
                    <TextInput
                    placeholder="room number"
                    onChangeText={setDelRoomNumber}/>
                    <Button title="DeleteRoom" onPress={()=>handleDelete}/>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
}