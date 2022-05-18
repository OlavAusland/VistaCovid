import { useEffect, useReducer, useState } from 'react';
import { View, Text, Button, TextInput, ScrollView, Dimensions, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { homeStyle } from '../styles/HomeStyles';
import { BarChart, LineChart } from 'react-native-chart-kit';
import { GraphData, Room } from '../domain/RoomType';
import { addRoom, getLoggedInUser, getRole, getRooms } from '../api/firebaseAPI';
import { AssignPatientModal } from "./home/AssignPatientToRoomModal"
import Icon from 'react-native-vector-icons/FontAwesome5';
import { currentUser, Roles } from '../domain/UserType';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParameters, TabParameters } from '../domain/NavigationTypes';
import { Errormodal } from './ErrorModal';
import { ErrorType } from '../domain/Errortype';
import { auth, db } from '../firebase-config';
import { AdminView } from './Admin';
import { collection, doc, onSnapshot, query, where} from 'firebase/firestore';
import { Export } from './Export';

type  HomeScreenProps = NativeStackScreenProps<TabParameters, 'Home'>

export const HomeView = (props: HomeScreenProps) => {
    const [rooms, setRooms] = useState<Room[]>([])
    const [modalVisible, setModalVisible] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [error, setError] = useState<ErrorType>({errorObject:undefined, errormodalVisible:false});
    const [user, setUser] = useState<currentUser>({email: '', firstName: '', lastName: '', role: Roles.NONE, id:''});
    const [isLoading, setIsLoading] = useState(true);

    const extractXAxis = (data: GraphData[]) => {return data.map(d => d.value);}

    const handleRequestClose = () => {
        setModalVisible(false);
        setError((prev) =>({...prev,errorObject:undefined, errormodalVisible:false}));
    }
    useEffect(() => {
        const getRoomsData = async () => {
            await getRooms().then((res) => {
                setRooms(res);
            }).catch((err) => { setError((prev) =>({...prev, errorObject:err, errormodalVisible:true})); });
        };
        getRoomsData();
    }, []);

    useEffect(() => {
        const q = query(collection(db, 'Rooms'), where('patientId', '!=', ''));
        onSnapshot(q, (querySnapshot) => {
            const _rooms: Room[] = [];
            querySnapshot.forEach((doc) => {
                _rooms.push(doc.data() as Room);
            });
            setRooms(_rooms);
        });
    }, []);

    useEffect(() => {
        const getFirebaseRole = async() => {
            await getRole(auth.currentUser ? auth.currentUser.uid : 'default').then((role) => {
                if(role !== undefined)
                    setUser(prev => ({...prev, role: Roles[role?.toUpperCase() as keyof typeof Roles]}));
                    setIsLoading(false);
            }).catch((err) => { setError((prev) =>({...prev, errorObject:err, errormodalVisible:true})); });
        }
        getFirebaseRole();
    }, []);

    if(error.errormodalVisible){
        return (
            <Errormodal error={error} handleRequestClose={handleRequestClose} />
        )
    }

    if(modalVisible){
        return (
            <AssignPatientModal modalVisible={modalVisible} handleRequestClose={handleRequestClose} user={user} />
        )
    }


    if(user.role == Roles.ADMIN)
    {
        return(
            <AdminView/>
        );
    }else if(user.role == Roles.NURSE || user.role == Roles.DOCTOR)
    {
        return (
            <SafeAreaView style={homeStyle.container}>
                <View style={[homeStyle.header, styles.shadow, {backgroundColor:'white'}]}>
                    <TextInput onChangeText={(text) => {setKeyword(text)}} placeholder={'Search For Room'} style={homeStyle.searchBar} />
                </View>
                <View style={{ flex: 9 }}>
                    <ScrollView contentContainerStyle={[homeStyle.body]}>
                        {rooms.length > 0 &&
                            rooms.filter((room) => {if(room.patientId != '' && room.id.includes(keyword)){return room}}).sort((a, b) => a.id.localeCompare(b.id)).map((room: Room) => {
                                return (
                                    <TouchableOpacity key={'room:' + room.id} style={[homeStyle.card, styles.shadow, {overflow:'hidden'}]}
                                    onPress={() => {props.navigation.push('Room', {roomId:room.id})}}>
                                        <View style={{flex:1, padding:10, flexDirection:'row', flexWrap:'wrap'}}>
                                            <View style={{flexBasis:'100%', flexDirection:'row', justifyContent:'space-between'}}>
                                                <Text>Room: {room.id}</Text>
                                                <Text>Patient: {room.patientId}</Text>
                                            </View>
                                            <View style={{flexBasis:'100%', flexDirection:'row', justifyContent:'space-between', marginTop:20}}>
                                                <View style={{flexDirection:'row'}}>
                                                    <Icon size={20} name={'heartbeat'}/>
                                                    <Text>{room.heartRate[room.heartRate.length - 1].value}</Text>                                                    
                                                </View>
                                                <View style={{flexDirection:'row'}}>
                                                    <Icon size={20} name={'lungs'}/>
                                                    <Text>{room.heartRate[room.oxygenLevel.length - 1].value}</Text>
                                                </View>
                                                <View style={{flexDirection:'row'}}>
                                                    <Icon size={20} name={'wind'}/>
                                                    <Text>{room.heartRate[room.bloodPressure.length - 1].value}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{flex:3, marginTop:30}}>
                                            <LineChart
                                                withVerticalLabels={false}
                                                data={{
                                                    labels:[],
                                                    datasets:[
                                                        {
                                                            data: room.bloodPressure ? extractXAxis(room.bloodPressure).slice(-5) : [],
                                                            strokeWidth: 2,
                                                            color: (opacity = 0.1) => `rgba(235, 64, 52,${opacity})`
                                                        },
                                                        {
                                                            data: room.heartRate ? extractXAxis(room.heartRate).slice(-5) : [],
                                                            strokeWidth:2,
                                                            color: (opacity = 1) => `rgba(237, 184, 85,${opacity})`
                                                        }, 
                                                        {
                                                            data: room.oxygenLevel ? extractXAxis(room.oxygenLevel).slice(-5) : [],
                                                            strokeWidth:2,
                                                            color: (opacity = 1) => `rgba(110, 215, 224,${opacity})`
                                                        }
                                                    ],
                                                    legend: ['BP', 'HR', 'O2']
                                                }}
                                                width={Dimensions.get('window').width}
                                                height={125}
                                                chartConfig={{
                                                    useShadowColorFromDataset:true,
                                                    fillShadowGradientOpacity:0.5,
                                                    backgroundColor: "#C1E8FD",
                                                    backgroundGradientFrom: "#C1E8FD",
                                                    backgroundGradientTo: "#C1E8FD",
                                                    decimalPlaces: 0, // optional, defaults to 2dp
                                                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
                                                    }
                                                }
                                                style={{marginHorizontal:-10}}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </ScrollView>
                    {/*
                    { user.role == Roles.DOCTOR &&
                    <View style={{ paddingBottom: 10 }}>
                        <TouchableOpacity onPress={() => { setModalVisible(true) }} style={{ flexDirection: 'row', justifyContent: 'center', backgroundColor: '#C1E8FD' }}>
                            <Text style={{ fontSize: 20, paddingTop: 5 }}>Assign Patient</Text>
                            <Icon name='bed-patient' size={40} style={{ alignSelf: 'center', paddingLeft: 10 }} onPress={() => { setModalVisible(true) }} />
                        </TouchableOpacity>
                    </View>
                    }
                */}
                </View>
            </SafeAreaView>
        );
    }else if(isLoading){
        return(
            <View style={homeStyle.container}>
                <Text>Loading...</Text>
            </View>
        );
    }else {
        return(
            <View style={homeStyle.container}>
                <Text>You are not authorized to view this page</Text>
            </View>
        )
    };
}

export const styles = StyleSheet.create({
    shadow:{
        shadowColor: "#000", 
        shadowOffset: { width: 0,height: 3},
        shadowOpacity: 0.27,
        shadowRadius: 4.65, 
        elevation: 6
    }
})