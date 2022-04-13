import { View, Text, ScrollView, Button} from 'react-native';
import { useEffect, useState } from 'react';
import { roomStyle } from '../styles/RoomStyles';
import { Room } from '../types/RoomType';
import { Patient } from '../types/PatientType';

import { LineGraph } from './room/graph';

import { getRoom, deleteRoom, getPatient } from '../api/firebaseAPI';
import { profileStyle } from '../styles/ProfileStyles';

export function RoomView()
{
    const [patient, setPatient] = useState<Patient>()
    const [room, setRoom] = useState<Room>()
    const [fetching, setFetching] = useState<boolean>(true)

    useEffect(() => {
        const getRoomData = async () => {
            console.log('Getting Room: ');
            await getRoom('awDdlNKxiCpMsHqsE2Rh').then(async(res) => {
                console.log(res);
                setRoom(res);
                setFetching(false);
                if(res !== undefined){await getPatientData(res);}
            }).catch((err) => {console.log(err);});
        };

        const getPatientData = async (room: Room) => {
            const id = room?.patientId;
            
            if(id !== undefined){
                await getPatient(id).then((res) => {
                    console.log(res);
                    setPatient(res);
                }).catch((err) => {console.log(err);});
            }
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
                    <Text style={{fontSize:20}}>Patient: {patient?.firstname} {patient?.lastname}</Text>
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