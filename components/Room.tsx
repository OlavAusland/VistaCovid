import { View, Text, ScrollView, Button, TouchableOpacity, LogBox, Touchable} from 'react-native';
import React, { useEffect, useState } from 'react';
import { roomStyle } from '../styles/RoomStyles';
import { Room } from '../domain/RoomType';
import { Patient } from '../domain/PatientType';

import { GraphView } from './room/GraphView';
import { NotesView } from './room/NotesView';
import Notification from './Notification';

import { getRoom, deleteRoom, getPatient } from '../api/firebaseAPI';
import Icon from 'react-native-vector-icons/AntDesign';
import DateTimePickerModal from "react-native-modal-datetime-picker"
import { PatientInfoModal } from './room/PatientInfoModal';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParameters } from '../domain/NavigationTypes';
LogBox.ignoreLogs(['Setting a timer']);


type Props = NativeStackScreenProps<StackParameters, 'Room'>;

export function RoomView({route, navigation}: Props)
{
    const [modalVisible, setModalVisible] = useState(false);
    const [date, setDate] = useState({startDate:{date: new Date(), visible: false}, endDate:{date: new Date(), visible: false}});
    const [patient, setPatient] = useState<Patient>()
    const [room, setRoom] = useState<Room>()
    const [fetching, setFetching] = useState<boolean>(true)
    const [modal, setModal] = useState(false);

    const props = route.params;

    const handleRequestClose = () => {
        setModalVisible(false); 
    }

    const [view, setView] = useState<string>('graphs')
    Notification();
    useEffect(() => {
        const getRoomData = async () => {
            await getRoom(props?.roomId).then(async(res) => {
                setRoom(res);
                setFetching(false);
                if(res !== undefined){await getPatientData(res);}
            }).catch((err) => {console.log(err);});
        };

        const getPatientData = async (room: Room) => {
            const id = room?.patientId;
            
            if(id !== ""){
                await getPatient(id).then((res) => {
                    setPatient(res);
                    console.log(res?.firstname)
                }).catch((err) => {console.log(err);});
            }
        };

        getRoomData();
    }, []);

    useEffect(() => {const data = room?.heartRate?.map((res) => {return res.value}); }, [room]);


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
                    <View style={{flexDirection:'row', justifyContent:'center'}}>
                        <Text style={{fontSize:20}}>Patient: {patient?.firstname} {patient?.lastname}</Text>
                        <TouchableOpacity>
                            <Icon name='infocirlceo' size={20} style={{alignSelf:'center', paddingTop:5, paddingLeft:5}}  onPress={() => {setModalVisible(true)}} />
                        </TouchableOpacity>
                        <PatientInfoModal modalVisible={modalVisible} handleRequestClose={handleRequestClose} fnr = {patient? patient.ssn : ''}></PatientInfoModal>
                    </View>
                </View>
                <View style={{flexDirection:'row', flexWrap:'wrap', justifyContent:'space-between', alignItems:'center'}}>
                    <TouchableOpacity style={{flexBasis:'50%', justifyContent:'center', backgroundColor:'#9DD4FB', height:30}}
                    onPress={() => {setView('graphs')}}>
                        <Text style={{alignSelf:'center', fontWeight:'bold'}}>Graphs</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flexBasis:'50%', justifyContent:'center', backgroundColor:'#9DD4FB', height:30}}
                    onPress={() => {setView('notes')}}>
                        <Text style={{alignSelf:'center', fontWeight:'bold'}}>Notes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flexBasis:'50%', justifyContent:'center', backgroundColor:'#9DD4FB', height:30}}
                    onPress={() => {setDate({...date, startDate:{...date.startDate, visible: true}})}}>
                        <Text style={{alignSelf:'center', fontWeight:'bold'}}>Date From</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flexBasis:'50%', justifyContent:'center', backgroundColor:'#9DD4FB', height:30}}
                    onPress={() => {setDate({...date, endDate:{...date.endDate, visible: true}})}}>
                        <Text style={{alignSelf:'center', fontWeight:'bold'}}>Date To</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flexBasis:'100%', justifyContent:'center', backgroundColor:'#9DD4FB', height:60}}>
                        <Text style={{alignSelf:'center', fontWeight:'bold'}}>Export</Text>
                    </TouchableOpacity>
                    <View>
                        <DateTimePickerModal
                            isVisible={date.endDate.visible}
                            date={date.endDate.date}
                            mode="date"
                            onConfirm={(newDate: Date) => {setDate({...date, endDate:{date:newDate, visible: false}})}}
                            onCancel={() => {setDate({...date, endDate:{...date.endDate, visible: false}})}}
                        />
                        <DateTimePickerModal
                            isVisible={date.startDate.visible}
                            date={date.startDate.date}
                            mode="date"
                            onConfirm={(newDate: Date) => {setDate({...date, startDate:{date:newDate, visible: false}})}}
                            onCancel={() => {setDate({...date, startDate:{...date.startDate, visible: false}})}}
                        />
                    </View>
                </View>
                <View>
                    
                </View>
                {(view === 'graphs' && room !== undefined) ? <GraphView room={room} setModal={setModal} modal={modal}/> : <NotesView room={room}/> }
            </View>
        );
    }
}