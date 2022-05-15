import { useState } from "react";
import React, { ScrollView, TextInput, View, Text, Button, SafeAreaView, Alert } from "react-native";
import { adminStyle } from "../../styles/AdminStyles";
import { Room } from "../../domain/RoomType";
import { addRoom } from "../../api/firebaseAPI";
import { NoteData } from "../../domain/RoomType";
import { Roles } from "../../domain/UserType";

export function AddRoom()
{

    const [roomNumber, setRoomNumber] = useState("")

 
    const newroom: Room = {
        id: roomNumber,
        patientId: "",
        roomNumber: roomNumber,
        lastUpdated: Date.now().toString(),
        heartRate: [],
        bloodPressure: [],
        oxygenLevel: [],
        notes: []
     }


     const SuccessfullAlert = () =>
     Alert.alert(
       "yay gikk bra",
       "bitch",
       [
         { text: "OK", onPress: () => console.log("OK Pressed", roomNumber) }
       ]
     );

     const UnsuccessfullAlert = () =>
     Alert.alert(
       "bitch det gikk ikke buuu",
       "bitch",
       [
         { text: "OK", onPress: () => console.log("OK Pressed") }
       ]
     );

     const AddRoom = () =>{
         
         addRoom(newroom).then(() => {SuccessfullAlert()}).catch(() => {UnsuccessfullAlert()})
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
                    onChangeText={setRoomNumber}
                    placeholder="room number"/>
                    <View style={adminStyle.addRoomButton}>
                        <Button title='Add Room' onPress={()=>{AddRoom()}}/>
                    </View>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
}