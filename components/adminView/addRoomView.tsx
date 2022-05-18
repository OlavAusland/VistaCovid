import { useState } from "react";
import React, { Alert, Button, SafeAreaView, ScrollView, Text, TextInput, View } from "react-native";
import { addRoom } from "../../api/firebaseAPI";
import { Room } from "../../domain/RoomType";
import { adminStyle } from "../../styles/AdminStyles";

export function AddRoom() {

    const [roomNumber, setRoomNumber] = useState("")


    const newroom: Room = {
        id: roomNumber,
        patientId: "",
        lastUpdated: Date.now().toString(),
        heartRate: [],
        bloodPressure: [],
        oxygenLevel: [],
        notes: []
    }


    const SuccessfullAlert = () =>
        Alert.alert(
            "Successfully added room with room number: " + { roomNumber },
            "",
            [
                { text: "OK", onPress: () => console.log("OK Pressed", roomNumber) }
            ]
        );

    const UnsuccessfullAlert = () =>
        Alert.alert(
            "Could not add room with room number: ",
            "Room might already exist",
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        );

    const AddRoom = () => {
        addRoom(newroom).then((res) => {
            if (res) {
                SuccessfullAlert()
            } else {
                UnsuccessfullAlert();
            }
        }).catch((err) => {
            console.log("Error: " + err);
        })
    }

    return (
        <ScrollView style={adminStyle.addRoomContainer}>
            <SafeAreaView>
                <View style={adminStyle.addRoomHeader}>
                    <Text style={adminStyle.headertext}>Add Room</Text>
                </View>
                <View>
                    <TextInput
                        style={adminStyle.addRoomInput}
                        onChangeText={setRoomNumber}
                        placeholder="room number" />
                    <View style={adminStyle.addRoomButton}>
                        <Button title='Add Room' onPress={() => { AddRoom() }} />
                    </View>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
}