import { useEffect, useReducer, useState } from 'react';
import { View, Text, Button, TextInput, ScrollView, Dimensions, TouchableOpacity, SafeAreaView } from 'react-native';
import { homeStyle } from '../styles/HomeStyles';
import { BarChart } from 'react-native-chart-kit';
import { Room } from '../domain/RoomType';
import { addRoom, getLoggedInUser, getRole, getRooms } from '../api/firebaseAPI';
import { AssignPatientModal } from "./home/AssignPatientToRoomModal"
import Icon from 'react-native-vector-icons/Fontisto';
import { currentUser, Roles } from '../domain/UserType';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParameters, TabParameters } from '../domain/NavigationTypes';
import { Errormodal } from './ErrorModal';
import { ErrorType } from '../domain/Errortype';
import { auth, db } from '../firebase-config';
import { AdminView } from './Admin';
import { collection, doc, onSnapshot, query, where} from 'firebase/firestore';
import { Exportmodal } from './exportModal';

type  HomeScreenProps = NativeStackScreenProps<TabParameters, 'Home'>

export const HomeView = (props: HomeScreenProps) => {
    const [rooms, setRooms] = useState<Room[]>([])
    const [modalVisible, setModalVisible] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [error, setError] = useState<ErrorType>({errorObject:undefined, errormodalVisible:false});
    const [user, setUser] = useState<currentUser>({email: '', firstName: '', lastName: '', role: Roles.NONE, id:''});
    const [isLoading, setIsLoading] = useState(true);


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
            //<AssignPatientModal modalVisible={modalVisible} handleRequestClose={handleRequestClose} user={user} />
            <Exportmodal handleRequestClose={handleRequestClose}/>
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
                <View style={homeStyle.header}>
                    <TextInput onChangeText={(text) => {setKeyword(text)}} placeholder={'Search For Room'} style={homeStyle.searchBar} />
                </View>
                { user.role == Roles.DOCTOR &&
                    <View style={{ paddingBottom: 10 }}>
                        <TouchableOpacity onPress={() => { setModalVisible(true) }} style={{ flexDirection: 'row', justifyContent: 'center', backgroundColor: '#C1E8FD' }}>
                            <Text style={{ fontSize: 20, paddingTop: 5 }}>Assign Patient</Text>
                            <Icon name='bed-patient' size={40} style={{ alignSelf: 'center', paddingLeft: 10 }} onPress={() => { setModalVisible(true) }} />
                        </TouchableOpacity>
                        
                    </View>
                }
                <View style={{ flex: 4 }}>
                    <ScrollView contentContainerStyle={[homeStyle.body]}>
                        {rooms.length > 0 &&
                            rooms.filter((room) => {if(room.patientId != '' && room.id.includes(keyword)){return room}}).map((room: Room) => {
                                return (
                                    <TouchableOpacity key={'room:' + room.id} style={homeStyle.card}
                                    onPress={() => {props.navigation.push('Room', {roomId:room.id})}}>
                                        <BarChart
                                            data={{
                                                labels: ['BL', 'O2', 'HR'],
                                                datasets: [{
                                                    data: [room.bloodPressure.length > 0 ? room.bloodPressure[room.bloodPressure.length - 1].value : 0,
                                                    room.oxygenLevel.length > 0 ? room.oxygenLevel[room.oxygenLevel.length - 1].value : 0,
                                                    room.heartRate.length > 0 ? room.heartRate[room.heartRate.length - 1].value : 0]
                                                }]
                                            }}
                                            yAxisLabel={''}
                                            yAxisSuffix={''}
                                            width={Dimensions.get('window').width * 0.9 / 2}
                                            height={200}
                                            chartConfig={{
                                                backgroundColor: "#FFFFFF",
                                                backgroundGradientFrom: "#9dd9fb",
                                                backgroundGradientTo: "#9dd4fb",
                                                decimalPlaces: 0, // optional, defaults to 2dp
                                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                                style: {
                                                    flex: 2
                                                },
                                                barPercentage: 0.5,
                                                propsForDots: {
                                                    r: "3",
                                                    strokeWidth: "1",
                                                    stroke: "#ffa726"
                                                }
                                            }}
                                            withHorizontalLabels={true}
                                            fromZero={true}
                                        />
                                        <View style={{ flex:9, flexDirection: 'column' }}>
                                            <Text> Room: {room.id}</Text>
                                            <Text> Patient: {room.patientId ? room.patientId : 'No Patient'}</Text>
                                        </View>
                                        <View style={{flex:1, backgroundColor:['yellow', 'red', 'green'][~~(Math.random()*3)]}}/>
    
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </ScrollView>
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