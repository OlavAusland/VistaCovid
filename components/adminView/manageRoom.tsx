import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { addEmptyRoom, deleteRoom, getRooms } from "../../api/firebaseAPI";
import { StackParameters } from "../../domain/NavigationTypes";
import { Room } from "../../domain/RoomType";
import { db } from "../../firebase-config";
import { manageRoomStyles } from '../../styles/ManageRoomStyles';


export function ManageRoom()
{
    const navigation = useNavigation<NativeStackNavigationProp<StackParameters>>();

    const [rooms, setRooms] = useState<Room[]>([]);

    const [delRoomNumber, setDelRoomNumber] = useState('')

    const [modalVisible, setModalVisible] = useState(false);
    
    const [search, setSearch] = useState<string>('')

    useEffect(() => {
        onSnapshot(collection(db, "Rooms"), (snapshot) => {
            let _rooms: Room[] = [];
            snapshot.forEach((doc) => {
                _rooms.push(doc.data() as Room);
            });
            setRooms(_rooms);
        });
    }, []);

    useEffect(() => { getRooms().then((rooms: Room[]) => {setRooms(rooms)});}, []);

    const getRoomsBySearch = (): Room[] => {return rooms.filter((room) => {if(room.id.includes(search)){return room}})}

    return(
        <SafeAreaView style={{flex:1}}>
            <View style={[manageRoomStyles.header, manageRoomStyles.shadow]}>
                <TextInput
                    placeholder="room number"
                    onChangeText={(text) => {setSearch(text)}}
                    style={manageRoomStyles.search}/>
            </View>
            <ScrollView contentContainerStyle={manageRoomStyles.container}>
                {getRoomsBySearch().length > 0 && getRoomsBySearch().map((room: Room) => {
                    return(
                        <View  key={room.id} style={manageRoomStyles.cardContainer}>
                            <View style={manageRoomStyles.card}>
                                <Icon style={{alignSelf:'center'}} name='clipboard' size={80}/>
                                <Text style={{flex:1}}>Room: {room.id}</Text>
                                <Text style={{flex:1}}>Patient: {room.patientId}</Text>
                            </View>
                            <TouchableOpacity onPress={() =>{deleteRoom(room.id)}} style={manageRoomStyles.delete}>
                                <Icon name='trash-2' color={'white'} size={40}/>
                            </TouchableOpacity>
                        </View>
                    );
                })}
                {getRoomsBySearch().length == 0 &&
                <View style={manageRoomStyles.addRoom}>  
                    <TouchableOpacity style={[manageRoomStyles.add, manageRoomStyles.shadow]} onPress={() => {addEmptyRoom(search)}}>
                        <Text style={manageRoomStyles.addRoomText}>Add Room: {"\n"}{search}</Text>
                    </TouchableOpacity>
                </View>
                }
                
            </ScrollView>
        </SafeAreaView>
    );
}