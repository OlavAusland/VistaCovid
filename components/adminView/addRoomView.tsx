import { useState } from "react";
import React, { ScrollView, TextInput, View, Text, Button, SafeAreaView } from "react-native";
import { adminStyle } from "../../styles/AdminStyles";
import { Room } from "../../domain/RoomType";
import { addRoom } from "../../api/firebaseAPI";

export function AddRoom()
{
    const newroom: Room = {
        patientId:'None',
        roomNumber: 'A2 023',
        lastUpdated: Date.now().toString(),
        heartRate: [{time: 0, value: 62}, {time: 1, value: 32}],
        bloodPressure: [{time: 0, value: 122}, {time: 1, value: 82}],
        oxygenLevel: [{time: 0, value: 102}, {time: 1, value: 92}],
        notes: [{role: 3, note: 'This is a another new note'}]
    }

    const [text, onChangeText] = useState("")

    return(
        <ScrollView style={adminStyle.addRoomContainer}>
            <SafeAreaView>
                <View style={adminStyle.addRoomHeader}>
                    <Text style={adminStyle.headertext}>Add Room</Text>
                </View>
                <View>
                    <TextInput
                    style={adminStyle.addRoomInput}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder="patient id"/>
                    <TextInput
                    style={adminStyle.addRoomInput}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder="room number"/>
                    <Button title='Add Room' onPress={()=>{addRoom(newroom)}}/>
                </View>
            </SafeAreaView>
        </ScrollView>

    );
}