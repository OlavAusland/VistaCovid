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
        </View>
    )
}