import { Alert, Button, Modal, SafeAreaView, ScrollView, TextInput, View } from "react-native";
import { useState } from "react";
import { deleteRoom } from "../../api/firebaseAPI";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParameters } from "../../domain/NavigationTypes";

export function ManageRoom()
{
    const navigation = useNavigation<NativeStackNavigationProp<StackParameters>>();

    const [roomNumber, setRoomNumber] = useState('')
    const [delroomNumber, setDelRoomNumber] = useState('')
    const [modalVisible, setModalVisible] = useState(false);

    function handleDelete(){
        return(
            <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={()=>{
                Alert.alert("modal has been closed.");
                setModalVisible(!modalVisible);}}>
                    <View></View>
                </Modal>
        );
    }

    return(
        <ScrollView>
            <SafeAreaView>
                <View>
                    <TextInput
                    placeholder="room number"
                    onChangeText={setRoomNumber}/>
                    <Button title="Edit room" onPress={()=>navigation.navigate("EditRoom")}/>
                </View>
                <View>
                    <TextInput
                    placeholder="room number"
                    onChangeText={setDelRoomNumber}/>
                    <Button title="DeleteRoom" onPress={()=>{deleteRoom(delroomNumber)}}/>
                </View>
            </SafeAreaView>
        </ScrollView>

    );
}