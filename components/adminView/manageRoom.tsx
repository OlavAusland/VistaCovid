import { SafeAreaView, TouchableOpacity, ScrollView, TextInput, View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { addEmptyRoom, addRoom, deleteRoom, getRooms } from "../../api/firebaseAPI";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParameters } from "../../domain/NavigationTypes";
import {Room} from "../../domain/RoomType"
import Icon from "react-native-vector-icons/Feather";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase-config";

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
            <View style={[styles.header, styles.shadow]}>
                <TextInput
                    placeholder="room number"
                    onChangeText={(text) => {setSearch(text)}}
                    style={styles.search}/>
            </View>
            <ScrollView contentContainerStyle={{flex:1, alignItems:'center'}}>
                {getRoomsBySearch().length > 0 && getRoomsBySearch().map((room: Room) => {
                    return(
                        <View  key={room.id} style={styles.cardContainer}>
                            <View style={styles.card}>
                                <Icon style={{alignSelf:'center'}} name='clipboard' size={80}/>
                                <Text style={{flex:1}}>Room: {room.id}</Text>
                                <Text style={{flex:1}}>Patient: {room.patientId}</Text>
                            </View>
                            <TouchableOpacity onPress={() =>{deleteRoom(room.id)}} style={styles.delete}>
                                <Icon name='trash-2' color={'white'} size={40}/>
                            </TouchableOpacity>
                        </View>
                    );
                })}
                {getRoomsBySearch().length == 0 &&
                <View style={{width:'100%', height:'100%', alignItems:'center'}}>  
                    <TouchableOpacity style={[styles.add, styles.shadow]} onPress={() => {addEmptyRoom(search)}}>
                        <Text style={{fontSize:20, textAlign:'center'}}>Add Room: {"\n"}{search}</Text>
                    </TouchableOpacity>
                </View>
                }
                
            </ScrollView>
        </SafeAreaView>
    );
}

export const styles = StyleSheet.create({
    header:{
        backgroundColor:'white',
        paddingTop:40,
        paddingBottom:10
    },
    delete: {
        backgroundColor:'red', 
        flexBasis:'15%', 
        height:100, 
        justifyContent:'center', 
        alignItems:'center', 
        shadowColor: "#000", 
        shadowOffset: { width: 0,height: 3},
        shadowOpacity: 0.27,
        shadowRadius: 4.65, 
        elevation: 6
    },
    cardContainer:{
        width:'90%',
        marginTop:25,
        flexDirection:'row', 
        justifyContent:'space-between', 
        alignItems:'center', 
    },
    shadow:{
        shadowColor: "#000", 
        shadowOffset: { width: 0,height: 3,},
        shadowOpacity: 0.27,
        shadowRadius: 4.65, 
        elevation: 6
    },
    card: {
        flexDirection:'row', 
        backgroundColor:'#79CAED', 
        flexBasis:'84%', 
        height:100, 
        justifyContent:'center', 
        shadowColor: "#000", 
        shadowOffset: { width: 0,height: 3,},
        shadowOpacity: 0.27,
        shadowRadius: 4.65, 
        elevation: 6
    },
    add:{
        marginTop:25,
        backgroundColor:'white',
        width:'90%',
        height:75,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10
    },
    search:{
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderRadius:10,
        padding: 10,
    }
})