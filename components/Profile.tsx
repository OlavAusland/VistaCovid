import { View, TouchableOpacity, Text } from "react-native"
import { AssignPatientModal } from "./home/AssignPatientToRoomModal"
import React, { useState } from "react"
import Icon from 'react-native-vector-icons/Fontisto';

export const ProfileView = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const handleRequestClose = () => {
        setModalVisible(false);
    }
    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'center' , backgroundColor:'#C1E8FD'}}>
                <Text style={{ fontSize: 30, paddingTop: 5 }}>Assign Patient</Text>
                <TouchableOpacity>
                    <Icon name='bed-patient' size={60} style={{ alignSelf: 'center', paddingLeft: 10 }} onPress={() => { setModalVisible(true) }} />
                </TouchableOpacity>
            </View>
        </View>
    )
}