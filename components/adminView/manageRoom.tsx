import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import Icon3 from 'react-native-vector-icons/Fontisto';
import { addEmptyRoom, deleteRoom, getRooms } from "../../api/firebaseAPI";
import { Room } from "../../domain/RoomType";
import { db } from "../../firebase-config";
import { manageRoomStyles } from '../../styles/ManageRoomStyles';


export function ManageRoom() {
   
    const [rooms, setRooms] = useState<Room[]>([]);
    const [search, setSearch] = useState<string>('')

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "Rooms"), (snapshot) => {
            let _rooms: Room[] = [];
            snapshot.forEach((doc) => {
                _rooms.push(doc.data() as Room);
            });
            setRooms(_rooms);
        });

        return () => unsub();
    }, []);

    useEffect(() => { getRooms().then((rooms: Room[]) => { setRooms(rooms) }); }, []);

    const getRoomsBySearch = (): Room[] => { return rooms.filter((room) => { if (room.id.includes(search)) { return room } }) }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={[manageRoomStyles.header, manageRoomStyles.shadow]}>
<               View style={manageRoomStyles.headerText}>
                        <Icon3 name='search' size={20} style={{ alignSelf: 'center', paddingLeft: 10 }} />
                        <TextInput  placeholder="room number"  onChangeText={(text) => { setSearch(text) }}style={manageRoomStyles.search} />
                    </View>
            </View>
            <ScrollView contentContainerStyle={manageRoomStyles.container}>
                {getRoomsBySearch().length > 0 && getRoomsBySearch().map((room: Room) => {
                    return (
                        <View key={room.id} style={manageRoomStyles.cardContainer}>
                            <View style={manageRoomStyles.card}>
                                <Icon style={{ alignSelf: 'center' }} name='clipboard' size={80} />
                                <Text style={{ flex: 1 }}>Room: {room.id}</Text>
                                <Text style={{ flex: 1 }}>Patient: {room.patientId}</Text>
                            </View>
                            <TouchableOpacity onPress={() => { deleteRoom(room.id) }} style={manageRoomStyles.delete}>
                                <Icon name='trash-2' color={'white'} size={40} />
                            </TouchableOpacity>
                        </View>
                    );
                })}
                {getRoomsBySearch().length == 0 &&
                    <View style={manageRoomStyles.addRoom}>
                        <TouchableOpacity style={[manageRoomStyles.add, manageRoomStyles.shadow]} onPress={() => { addEmptyRoom(search) }}>
                            <Text style={manageRoomStyles.addRoomText}>Add Room: {"\n"}{search}</Text>
                        </TouchableOpacity>
                    </View>
                }

            </ScrollView>
        </SafeAreaView>
    );
}