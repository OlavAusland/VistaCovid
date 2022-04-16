import { View, Text, ScrollView, Button} from 'react-native';
import React, { useEffect, useState } from 'react';
import { roomStyle } from '../styles/RoomStyles';
import { Room } from '../domain/RoomType';

import { LineGraph } from './room/graph';

import { getRoom, deleteRoom } from '../api/firebaseAPI';
import { profileStyle } from '../styles/ProfileStyles';


export function RoomView()
{
    const [room, setRoom] = useState<Room>()
    const [fetching, setFetching] = useState<boolean>(true)

    useEffect(() => {
        const getRoomData = async () => {
            
            await getRoom('awDdlNKxiCpMsHqsE2Rh').then((res) => {

                setRoom(res);
                setFetching(false);
            }).catch((err) => {console.log(err);});
        };

        getRoomData();
    }, []);

    useEffect(() => {const data = room?.heartRate?.map((res) => {return res.value}); console.log(data)}, [room]);


    if(fetching)
    {
        return(
            <View style={roomStyle.container}>
                <Text style={{alignSelf:'center', fontSize:40}}>Loading...</Text>
            </View>
        );
    }else{
        return(
            <View style={roomStyle.container}>
                <View style={roomStyle.header}>
                    <Text style={roomStyle.headerText} >Room: {room?.roomNumber}</Text>  
                </View>
                <ScrollView style={{flex:6}} contentContainerStyle={roomStyle.body}>
                    <View>
                        <Text style={{fontSize:30, textDecorationLine:'underline'}}>Heart Rate:</Text>
                        <LineGraph room={room}/>
                    </View>
                </ScrollView>
            </View>
        );   
    }
}