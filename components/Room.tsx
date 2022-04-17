import { View, Text, ScrollView, Button, TouchableOpacity} from 'react-native';
import { useEffect, useState } from 'react';
import { roomStyle } from '../styles/RoomStyles';
import { Room } from '../types/RoomType';
import { Patient } from '../types/PatientType';

import { LineGraph } from './room/Graph';
import { GraphModal } from './room/GraphModal';
import { GraphView } from './room/GraphView';
import { NotesView } from './room/NotesView';

import { getRoom, deleteRoom, getPatient } from '../api/firebaseAPI';
import { profileStyle } from '../styles/ProfileStyles';
import Icon from 'react-native-vector-icons/AntDesign';

export function RoomView()
{
    const [patient, setPatient] = useState<Patient>()
    const [room, setRoom] = useState<Room>()
    const [fetching, setFetching] = useState<boolean>(true)

    const [modal, setModal] = useState(false);

    const [view, setView] = useState<string>('graphs')

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
                <GraphModal room={room} modal={modal} setModal={setModal} />
                <View style={roomStyle.header}>
                    <Text style={roomStyle.headerText} >Room: {room?.roomNumber}</Text>
                    <View style={{flexDirection:'row', justifyContent:'center'}}>
                        <Text style={{fontSize:20}}>Patient: {patient?.firstname} {patient?.lastname}</Text>
                        <TouchableOpacity>
                            <Icon name='infocirlceo' size={20} style={{alignSelf:'center', paddingTop:5, paddingLeft:5}}/>
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                    <TouchableOpacity style={{flexBasis:'50%', justifyContent:'center', backgroundColor:'#9DD4FB', height:30}}
                    onPress={() => {setView('graphs')}}>
                        <Text style={{alignSelf:'center', fontWeight:'bold'}}>Graphs</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flexBasis:'50%', justifyContent:'center', backgroundColor:'#9DD4FB', height:30}}
                    onPress={() => {setView('notes')}}>
                        <Text style={{alignSelf:'center', fontWeight:'bold'}}>Notes</Text>
                    </TouchableOpacity>
                </View>
                {(view === 'graphs' && room !== undefined) ? <GraphView room={room} setModal={setModal} modal={modal}/> : <NotesView room={room}/> }
            </View>
        );
    }
}