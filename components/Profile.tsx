import { View, Text, Button, ScrollView } from 'react-native';
import { useState } from 'react';
import { profileStyle } from '../styles/ProfileStyles';
import { addRoom, deleteRoom } from '../api/firebaseAPI';
import { Room } from '../domain/RoomType';
import { getAdditionalUserInfo } from 'firebase/auth';
import { getPatient } from '../api/folkeregisterModelAPI';
import { PatientInfoModal} from './PatientInfoModal';






export const ProfileView = () =>
{
    const [modalVisible, setModalVisible] = useState(false);

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
    const handleRequestClose = () => {
        setModalVisible(false); 
    }

    return (
        <View style={profileStyle.container}>
            {/*HEADER*/}
            <View style={{flex:1}}>
                <Text style={{alignSelf:'center'}}>Profile</Text>
                <Button title="Add Room" onPress={() => {setModalVisible(true)} }/>
                <Button title="Delete Room" onPress={() => {deleteRoom('50uaIdfmRjd4CeRUBhOl')} }/>
            <ScrollView>
                <PatientInfoModal modalVisible={modalVisible} handleRequestClose={handleRequestClose} fnr={"29095915638"}/>
            </ScrollView>
            </View>
        </View>
    );
}