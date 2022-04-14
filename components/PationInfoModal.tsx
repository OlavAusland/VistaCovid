import { Text, View, TextInput, Pressable, Modal } from 'react-native';
import { useState } from 'react';
import { getPatient } from '../api/folkeregisterModelAPI';

export const PationInfoModal = (props) => {
    const pation = getPatient("26049915645");
    return(
        
        <Modal
            animationType="slide"
            statusBarTranslucent={true}
            transparent={true}
            visible={props.modalVisible}
            onRequestClose={() => {
            props.setModalVisible(!props.modalVisible);
            }}
        >
           
        </Modal>
    );
}