import { useState } from "react";
import { Modal, View, Text, Button, TextInput } from "react-native";
import { compute_rest_props } from "svelte/internal";
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
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <View style={{backgroundColor:"#DDDDDD", width:"90%", height:250, shadowColor:'black'}}>
                    <View style={{flex:1, alignItems:'center', marginTop:'5%'}}>
                        <TextInput editable={false} value={admin.email} placeholder="Email" style={{height: 40, width:'90%', borderColor: 'gray', borderWidth: 1}}/>
                        <TextInput placeholder="Password" onChangeText={text => setAdmin(prev => ({...prev, password:text}))}
                         style={{height: 40, width:'90%', borderColor: 'gray', borderWidth: 1}}/>
                    </View>
                    <View style={{flex:1, justifyContent:'flex-end'}}>
                        <Button title={"Confirm"} onPress={() => {props.handleConfirmation(admin.email, admin.password);props.handleRequestClose();}}/>
                        <Button title={"Close"} onPress={() => props.handleRequestClose()}/>
                    </View>
                </View>
            </View>
        </Modal>
    );
}