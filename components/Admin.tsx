import React from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import { addUser, addRoom } from '../api/firebaseAPI';
import { User } from '../types/UserType';
import { Room } from '../types/RoomType';
import { adminStyle } from '../styles/AdminStyles';


export function AdminView()
{
    const user: User ={
        email: 'skolebolle@bolle.net',
        password: 'passord1.',
        code: '42069',
        firstName: 'Lise',
        lastName: 'Larsen',
        role: 3,
        phone: '69696969',
        address: 'Slottsgata 1',
        city: 'Bergen',
    }

    const room: Room = {
        patientId:'None',
        roomNumber: 'A2 021',
        lastUpdated: Date.now().toString(),
        breathingRate: undefined,
        heartRate: [{time: 0, value: 60}, {time: 1, value: 30}],
        bloodPressure: [{time: 0, value: 120}, {time: 1, value: 80}],
        oxygenLevel: [{time: 0, value: 100}, {time: 1, value: 90}],
        notes: [{role: 3, note: 'This is a note'}]
    }

    return(
        <ScrollView>
            <View style={adminStyle.container}>
                <View style={adminStyle.header}>
                    <Text style={adminStyle.text}>Admin View</Text>
                </View>
                <View>
                    <View style={adminStyle.addRoom}>
                        <Button title='Add Room' onPress={() => {addRoom(room)}}></Button>
                    </View>
                    <View style={adminStyle.manageRoles}>
                    <Text>This is some text on the page</Text>
                    <Button title='Manage Roles' onPress={() => {addUser(user)} }></Button>
                    </View>
                </View>
            </View>
    
        </ScrollView>

    );
}