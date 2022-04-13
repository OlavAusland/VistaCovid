import { View, Text, ScrollView, Button, TouchableOpacity} from 'react-native';
import { useEffect, useState } from 'react';
import { roomStyle } from '../styles/RoomStyles';
import { Room } from '../types/RoomType';
import { Patient } from '../types/PatientType';

import { LineGraph } from './room/Graph';
import { GraphModal } from './room/GraphModal';

import { getRoom, deleteRoom, getPatient } from '../api/firebaseAPI';
import { profileStyle } from '../styles/ProfileStyles';

export function RoomView()
{
    const [patient, setPatient] = useState<Patient>()
    const [room, setRoom] = useState<Room>()
    const [fetching, setFetching] = useState<boolean>(true)

    const [modal, setModal] = useState(false)

    useEffect(() => {
        const getRoomData = async () => {
            await getRoom('awDdlNKxiCpMsHqsE2Rh').then(async(res) => {
                setRoom(res);
                setFetching(false);
                if(res !== undefined){await getPatientData(res);}
            }).catch((err) => {console.log(err);});
        };

        const getPatientData = async (room: Room) => {
            const id = room?.patientId;
            
            if(id !== undefined){
                await getPatient(id).then((res) => {
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
                <GraphModal visible={modal} setModal={setModal} />
                <View style={roomStyle.header}>
                    <Text style={roomStyle.headerText} >Room: {room?.roomNumber}</Text>
                    <Text style={{fontSize:20}}>Patient: {patient?.firstname} {patient?.lastname}</Text>
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                    <TouchableOpacity style={{flexBasis:'50%', backgroundColor:'#9DD4FB', height:30}}>
                        <Text style={{alignSelf:'center', fontWeight:'bold'}}>Graphs</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flexBasis:'50%', backgroundColor:'#9DD4FB', height:30}}>
                        <Text style={{alignSelf:'center', fontWeight:'bold'}}>Notes</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView contentContainerStyle={roomStyle.body}>
                    <View style={roomStyle.graphContainer}>
                        <LineGraph data={room?.heartRate} name={'Heart Rate'}/>
                    </View>
                    <View style={roomStyle.graphContainer}>
                        <LineGraph data={room?.bloodPressure} name={'Blood Pressure'}/>
                    </View>
                    <View style={roomStyle.graphContainer}>
                        <LineGraph data={room?.oxygenLevel}  name={'Oxygen Level'}/>
                    </View>
                    <View style={{width:'90%'}}>
                        { room?.notes?.map((res) => {
                            return(
                                <View style={roomStyle.noteContainer}>
                                    <Text style={{fontWeight:'bold', fontSize:25, textDecorationLine:'underline'}}>Role: {res.role}</Text>
                                    <Text>{res.role}: {res.note}</Text>
                                </View>
                            )
                        })}
                    </View>
                </ScrollView>
            </View>
        );   
    }
}