import { Alert, Button, Modal, SafeAreaView, ScrollView, TextInput, View, Text, Pressable } from "react-native";
import { useState } from "react";
import { adminStyle } from "../../styles/AdminStyles";

export default function handleDelete(){
    const [modalVisible, setModalVisible] = useState(false);
    return(
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={()=>{
            Alert.alert("modal has been closed.");
            setModalVisible(!modalVisible);}}>
                <View style={adminStyle.centeredView}>
                    <View style={adminStyle.modalView}>
                        <Text style={adminStyle.modalText}>Hello World!</Text>
                        <Pressable
                        style={[adminStyle.button, adminStyle.buttonClose]}
                        onPress={()=> setModalVisible(!modalVisible)}
                        >
                            <Text style={adminStyle.textStyle}>Hide modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
    );
}

