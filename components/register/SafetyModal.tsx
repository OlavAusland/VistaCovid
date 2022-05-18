import { useState } from "react";
import { safetyModalStyle } from '../../styles/SafetyModalStyles';
import React, { Modal, View, Text, Button, TextInput } from "react-native";
import { auth } from '../../firebase-config'

type SafetyModalProps = {
    modalVisible: boolean,
    handleRequestClose: Function,
    handleConfirmation: Function
}

type AdminObject = {
    email: string,
    password: string
}

export const SafetyModal = (props: SafetyModalProps) => {
    const [admin, setAdmin] = useState<AdminObject>({email:auth.currentUser?.email ? auth.currentUser?.email : '', password:''})

    return(
        <Modal
            animationType="slide"
            statusBarTranslucent={true}
            transparent={true}
            visible={props.modalVisible}
            onRequestClose={() => {() => props.handleRequestClose()}}
        >
            <View style={safetyModalStyle.container}>
                <View style={safetyModalStyle.div}>
                    <View style={safetyModalStyle.inputSection}>
                        <TextInput editable={false} value={admin.email} placeholder="Email" style={safetyModalStyle.input}/>
                        <TextInput placeholder="Password" onChangeText={text => setAdmin(prev => ({...prev, password:text}))}
                         style={safetyModalStyle.input}/>
                    </View>
                    <View style={safetyModalStyle.options}>
                        <Button title={"Confirm"} onPress={() => {props.handleConfirmation(admin.email, admin.password);props.handleRequestClose();}}/>
                        <Button title={"Close"} onPress={() => props.handleRequestClose()}/>
                    </View>
                </View>
            </View>
        </Modal>
    );
}