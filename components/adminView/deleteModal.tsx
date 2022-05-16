import { Alert, Button, Modal, SafeAreaView, ScrollView, TextInput, View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { adminStyle } from "../../styles/AdminStyles";
import {deleteRoom} from "../../api/firebaseAPI";

type DeleteRoomModal={
    modalVisible: boolean;
    handleRequestClose: Function;
    deleteRoomAndClose: Function;
}

export const DeleteRoomModal = (props: DeleteRoomModal) => {
    
    return(
        <Modal
        animationType="slide"
        statusBarTranslucent={true}
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={()=>props.handleRequestClose()}>

                <View style={adminStyle.centeredView}>
                    <View style={adminStyle.modalView}>
                        <Text style={adminStyle.modalText}>Are you sure you want to delete this room?</Text>
                        
                        <Pressable
                        style={[adminStyle.button, adminStyle.buttonClose]}
                        onPress={()=> props.deleteRoomAndClose()}
                        >
                            <Text style={adminStyle.textStyle}>Yes, delete room</Text>
                        </Pressable>

                        <Pressable
                        style={[adminStyle.button, adminStyle.buttonClose]}
                        onPress={()=> props.handleRequestClose()}
                        >
                            <Text style={adminStyle.textStyle}>No, close modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
    );
}

