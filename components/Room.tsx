import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { LogBox, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/AntDesign';
import { getPatient, getRoom } from '../api/firebaseAPI';
import { getPatient as folkeregisterpatient } from '../api/folkeregisterAPI';
import { ErrorType } from '../domain/Errortype';
import { StackParameters } from '../domain/NavigationTypes';
import { Patient } from '../domain/PatientType';
import { Room } from '../domain/RoomType';
import { db } from '../firebase-config';
import { roomStyle } from '../styles/RoomStyles';
import { csvexport } from '../utils/csvexport';
import { Errormodal } from './ErrorModal';
import { GraphView } from './room/GraphView';
import { NotesView } from './room/NotesView';
import { PatientInfoModal } from './room/PatientInfoModal';

LogBox.ignoreLogs(['Setting a timer']);


type Props = NativeStackScreenProps<StackParameters, 'Room'>;

export function RoomView({ route, navigation }: Props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [patient, setPatient] = useState<Patient>()
    const [room, setRoom] = useState<Room>()
    const [fetching, setFetching] = useState<boolean>(true)
    const [modal, setModal] = useState(false);
    const [error, setError] = useState<ErrorType>({errorObject:undefined, errormodalVisible:false});
    const [csv, setCsv] = useState<string>("");
    const [view, setView] = useState<string>('graphs')

 

    const props = route.params;

    const handleRequestClose = () => {
        setModalVisible(false);
        setError((prev) =>({...prev,errorObject:undefined, errormodalVisible:false}));
    }

    useEffect(() => {
        const getRoomData = async () => {
            await getRoom(props?.roomId).then(async (res) => {
                setRoom(res);
                setFetching(false);
            }).catch( (err) => { setError((prev) =>({...prev, errorObject:err, errormodalVisible:true}))});
        };
        getRoomData();
    }, []);

    useEffect(() => {
        onSnapshot(doc(db, "Rooms", props.roomId), (doc) => {
            setRoom(doc.data() as Room);
        });
    }, []);

    useEffect(() => {
        const getPatientData = async () => {
            const id = room?.patientId;
            let tempPatient = undefined;

            if (id) {
                await getPatient(id).then((res) => {
                    tempPatient = res;
                    setPatient(res);
                }).catch();
            }
            
            if (!tempPatient && id) {
                await folkeregisterpatient(id).then((res) => {
                    setPatient(res);
                }).catch((err) => { setError((prev) =>({...prev, errorObject:err, errormodalVisible:true}))});
            }
        };

        getPatientData();
    }, [room]);


    const handleExport = async() => {
        if(room){
            const response = await csvexport([room?.id], undefined, undefined);
            setCsv(response);
        }
        
    }


    useEffect(() => { const data = room?.heartRate?.map((res) => { return res.value }); }, [room]);

    const handlePress = () => {
        console.log("Setting modal to open");
        setModalVisible(true);
    }

    if (modalVisible) {
        return <PatientInfoModal
            handleRequestClose={handleRequestClose}
            patient={patient}
        />
    }
    if(error.errormodalVisible){
        return (
            <Errormodal error={error} handleRequestClose={handleRequestClose} />
        )
    }

    if (fetching) {
        return (
            <View style={roomStyle.container}>
                <Text style={{ alignSelf: 'center', fontSize: 40 }}>Loading...</Text>
            </View>
        );

    
    } else {
        return (
            <SafeAreaView style={[roomStyle.container]}>
                <View style={[roomStyle.header, roomStyle.shadow]}>
                    <Text style={roomStyle.headerText} >Room: {room?.id}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 20 }}>Patient: {patient?.firstname} {patient?.lastname}</Text>
                        <TouchableOpacity>
                            <Icon name='infocirlceo' size={20} style={{ alignSelf: 'center', paddingTop: 5, paddingLeft: 5 }} onPress={() => { handlePress() }} />
                        </TouchableOpacity>
                    </View>
                    <View style={roomStyle.buttonContainer}>
                        <TouchableOpacity style={[roomStyle.graphButton, roomStyle.shadow]}
                            onPress={() => { setView('graphs') }}>
                            <Text style={roomStyle.buttonTextSize}>Graphs</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[roomStyle.notesButton, roomStyle.shadow]}
                            onPress={() => { setView('notes') }}>
                            <Text style={roomStyle.buttonTextSize}>Notes</Text>
                        </TouchableOpacity>
                </View>
                </View>
                {(view === 'graphs' && room !== undefined) ? <GraphView room={room}/> : <NotesView room={room} />}
            </SafeAreaView>
        );
    }
}
