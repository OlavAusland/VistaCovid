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
            const response = await csvexport({ rooms: [room?.id],});
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
            <View style={styles.container}>
                <Text style={{ alignSelf: 'center', fontSize: 40 }}>Loading...</Text>
            </View>
        );

    
    } else {
        return (
            <SafeAreaView style={[styles.container]}>
                <View style={[styles.header, styles.shadow]}>
                    <Text style={roomStyle.headerText} >Room: {room?.id}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 20 }}>Patient: {patient?.firstname} {patient?.lastname}</Text>
                        <TouchableOpacity>
                            <Icon name='infocirlceo' size={20} style={{ alignSelf: 'center', paddingTop: 5, paddingLeft: 5 }} onPress={() => { handlePress() }} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={[styles.graphButton, styles.shadow]}
                            onPress={() => { setView('graphs') }}>
                            <Text style={styles.buttonTextSize}>Graphs</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.notesButton, styles.shadow]}
                            onPress={() => { setView('notes') }}>
                            <Text style={styles.buttonTextSize}>Notes</Text>
                        </TouchableOpacity>
                </View>
                </View>
                {(view === 'graphs' && room !== undefined) ? <GraphView room={room}/> : <NotesView room={room} />}
            </SafeAreaView>
        );
    }
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignSelf:'center', 
        width: Platform.OS === ('android' || 'IOS') ? '100%' : '100%',
        backgroundColor:'white'
    },
    header: {
        justifyContent:'center',
        alignItems:'center',
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'white'
    },
    graphButton:{
        flexBasis: '45%', 
        justifyContent: 'center', 
        backgroundColor: '#9DD4FB', 
        height: 60,
        borderRadius:10
    },
    notesButton:{
        flexBasis: '45%', 
        justifyContent: 'center',
        backgroundColor: '#9DD4FB',
        height: 60,
        borderRadius:10
    },
    buttonContainer:{
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 10,
        paddingTop:20,
        width:'100%'
    },
    buttonTextSize:{
        fontSize:20,
        alignSelf: 'center', 
        fontWeight: 'bold' 
    },
    shadow:{
        shadowColor: "#000", 
        shadowOffset: { width: 0,height: 3},
        shadowOpacity: 0.27,
        shadowRadius: 4.65, 
        elevation: 2
    }
});