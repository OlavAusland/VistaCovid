import { useState } from "react";
import React, { ScrollView, TextInput, View, Text, Button, SafeAreaView } from "react-native";
import { adminStyle } from "../../styles/AdminStyles";
import { Room } from "../../domain/RoomType";
import { addRoom } from "../../api/firebaseAPI";
import { NoteData } from "../../domain/RoomType";
import { Roles } from "../../domain/UserType";

export function AddRoom()
{

    const [patientId, setPatiantId] = useState("")
    const [roomNumber, setRoomNumber] = useState("")

 
    // const newroom: Room = {
    //     patientId: patientId,
    //     roomNumber: roomNumber,
    //     lastUpdated: Date.now().toString(),
    //     heartRate: undefined,
    //     bloodPressure: undefined,
    //     oxygenLevel: undefined,
    //     notes: undefined
    // }

    const AddRoom = () =>{
        console.log("ihsfldkjn")
        console.log(patientId)
        console.log(roomNumber)
        //Add room with entered patient id and roomnumber
        //If room number already exist then dont add??
        //addRoom(newroom)
    }

    return(
        <ScrollView style={adminStyle.addRoomContainer}>
            <SafeAreaView>
                <View style={adminStyle.addRoomHeader}>
                    <Text style={adminStyle.headertext}>Add Room</Text>
                </View>
                <View>
                    <TextInput
                    style={adminStyle.addRoomInput}
                    onChangeText={setPatiantId}
                    placeholder="patient id"/>
                    <TextInput
                    style={adminStyle.addRoomInput}
                    onChangeText={setRoomNumber}
                    placeholder="room number"/>
                    <View style={adminStyle.addRoomButton}>
                        <Button title='Add Room' onPress={()=>{AddRoom}}/>
                    </View>
                </View>
            </SafeAreaView>
        </ScrollView>

    );
}