import { View, Text, Button } from 'react-native';
import React, { useState } from 'react';
import { profileStyle } from '../styles/ProfileStyles';
import { addRoom, deleteRoom } from '../api/firebaseAPI';
import { Room } from '../domain/RoomType';
import { getAdditionalUserInfo } from 'firebase/auth';
import { getPatient } from '../api/folkeregisterModelAPI';
import { PationInfoModal} from './PationInfoModal';

const [modalVisible, setModalVisible] = useState(false);

export function ProfileView() 
{
    const room: Room = {
        patientId:'None',
        roomNumber: 'A2 021',
        lastUpdated: Date.now().toString(),
        breathingRate: undefined,
        heartRate: [{time: 0, value: 60}, {time: 1, value: 30}],
        bloodPressure: [{time: 0, value: 120}, {time: 1, value: 80}],
        oxygenLevel: [{time: 0, value: 100}, {time: 1, value: 90}],
        notes: [{role:'Nurse', note: 'This is a note'}]
    }

    return (
        <View style={profileStyle.container}>
            {/*HEADER*/}
            <View style={{flex:1}}>
            <PationInfoModal modalVisible={modalVisible} setModalVisible={setModalVisible}/>
                <Text style={{alignSelf:'center'}}>Profile</Text>
                <Button title="Add Room" onPress={() => {setModalVisible(true)} }/>
                <Button title="Delete Room" onPress={() => {deleteRoom('50uaIdfmRjd4CeRUBhOl')} }/>
            </View>
        </View>
    );
}