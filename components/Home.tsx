import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Dimensions, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { getRole, getRooms } from '../api/firebaseAPI';
import { ErrorType } from '../domain/Errortype';
import { TabParameters } from '../domain/NavigationTypes';
import { GraphData, Room } from '../domain/RoomType';
import { currentUser, Roles } from '../domain/UserType';
import { auth, db } from '../firebase-config';
import { homeStyle } from '../styles/HomeStyles';
import { AdminView } from './Admin';
import { Errormodal } from './ErrorModal';
import { AssignPatientModal } from "./home/AssignPatientToRoomModal";

type HomeScreenProps = NativeStackScreenProps<TabParameters, 'Home'>

export const HomeView = (props: HomeScreenProps) => {
    const [rooms, setRooms] = useState<Room[]>([])
    const [modalVisible, setModalVisible] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [error, setError] = useState<ErrorType>({ errorObject: undefined, errormodalVisible: false });
    const [user, setUser] = useState<currentUser>({ email: '', firstName: '', lastName: '', role: Roles.NONE, id: '' });
    const [isLoading, setIsLoading] = useState(true);

    const extractXAxis = (data: GraphData[]) => { return data.map(d => d.value); }

    const handleRequestClose = () => {
        setModalVisible(false);
        setError((prev) => ({ ...prev, errorObject: undefined, errormodalVisible: false }));
    }
    useEffect(() => {
        const getRoomsData = async () => {
            await getRooms().then((res) => {
                setRooms(res);
            }).catch((err) => { setError((prev) => ({ ...prev, errorObject: err, errormodalVisible: true })); });
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
        const getFirebaseRole = async () => {
            await getRole(auth.currentUser ? auth.currentUser.uid : 'default').then((role) => {
                if (role !== undefined)
                    setUser(prev => ({ ...prev, role: Roles[role?.toUpperCase() as keyof typeof Roles] }));
                setIsLoading(false);
            }).catch((err) => { setError((prev) => ({ ...prev, errorObject: err, errormodalVisible: true })); });
        }
        getFirebaseRole();
    }, []);

    if (error.errormodalVisible) {
        return (
            <Errormodal error={error} handleRequestClose={handleRequestClose} />
        )
    }

    if (modalVisible) {
        return (
            <AssignPatientModal modalVisible={modalVisible} handleRequestClose={handleRequestClose} />
        )
    }


    if (user.role == Roles.ADMIN) {
        return (
            <AdminView />
        );
    } else if (user.role == Roles.NURSE || user.role == Roles.DOCTOR) {
        return (
            <SafeAreaView style={homeStyle.container}>
                <View style={[homeStyle.header, homeStyle.shadow, { backgroundColor: 'white' }]}>
                    <TextInput onChangeText={(text) => { setKeyword(text) }} placeholder={'Search For Room'} style={homeStyle.searchBar} />
                </View>
                <View style={{ flex: 9 }}>
                    <ScrollView contentContainerStyle={[homeStyle.body]}>
                        {user.role == Roles.DOCTOR &&
                            <View style={{ paddingBottom: 10, width: '90%', paddingTop: 10 }}>
                                <TouchableOpacity onPress={() => { setModalVisible(true) }} style={[homeStyle.shadow, { flexDirection: 'row', justifyContent: 'center', backgroundColor: '#C1E8FD', borderRadius: 10 }]}>
                                    <Text style={{ fontSize: 20, paddingTop: 5 }}>Assign Patient</Text>
                                    <Icon name='address-book' size={40} style={{ alignSelf: 'center', paddingLeft: 10 }} onPress={() => { setModalVisible(true) }} />
                                </TouchableOpacity>
                            </View>
                        }
                        {rooms.length > 0 &&
                            rooms.filter((room) => {
                                if (room.patientId != '' && room.id.includes(keyword)) { return room }
                            }).sort((a, b) => a.id.localeCompare(b.id)).map((room: Room) => {
                                return (
                                    <TouchableOpacity key={'room:' + room.id} style={[homeStyle.card, homeStyle.shadow, { overflow: 'hidden' }]}
                                        onPress={() => { props.navigation.push('Room', { roomId: room.id }) }}>
                                        <View style={{ flex: 1, padding: 10, flexDirection: 'row', flexWrap: 'wrap' }}>
                                            <View style={{ flexBasis: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <Text>Room: {room.id}</Text>
                                                <Text>Patient: {room.patientId}</Text>
                                            </View>
                                            <View style={{flexBasis:'100%', flexDirection:'row', justifyContent:'space-between', marginTop:20}}>
                                                <View style={{flexDirection:'row'}}>
                                                    <Icon size={20} name={'heartbeat'}/>
                                                    <Text>{room.heartRate.length > 0 ? room.heartRate[room.heartRate.length - 1].value : '?'}</Text>                                                    
                                                </View>
                                                <View style={{flexDirection:'row'}}>
                                                    <Icon size={20} name={'lungs'}/>
                                                    <Text>{room.respirationRate.length > 0 ? room.respirationRate[room.respirationRate.length - 1].value : '?'}</Text>
                                                </View>
                                                <View style={{flexDirection:'row'}}>
                                                    <Icon size={20} name={'wind'}/>
                                                    <Text>{room.oxygenLevel.length > 0 ? room.oxygenLevel[room.oxygenLevel.length - 1].value : '?'}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        {room.heartRate.length > 0 && room.oxygenLevel.length > 0 && room.respirationRate.length > 0 &&
                                            <View style={{flex:3, marginTop:30}}>
                                                <LineChart
                                                    withVerticalLabels={false}
                                                    data={{
                                                        labels:[],
                                                        datasets:[
                                                            {
                                                                data: room.heartRate.length > 0 ? extractXAxis(room.heartRate).slice(-5) : [],
                                                                strokeWidth:2,
                                                                color: (opacity = 0.1) => `rgba(235, 64, 52,${opacity})`
                                                            }, 
                                                            {
                                                                data: room.respirationRate.length > 0 ? extractXAxis(room.respirationRate).slice(-5) : [],
                                                                strokeWidth: 2,
                                                                color: (opacity = 1) => `rgba(237, 184, 85,${opacity})`
                                                            },
                                                            {
                                                                data: room.oxygenLevel.length > 0 ? extractXAxis(room.oxygenLevel).slice(-5) : [],
                                                                strokeWidth:2,
                                                                color: (opacity = 1) => `rgba(110, 215, 224,${opacity})`
                                                            }
                                                        ],
                                                        legend: ['HR', 'RR', 'O₂']
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
                                        }
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    } else if (isLoading) {
        return (
            <View style={homeStyle.container}>
                <Text>Loading...</Text>
            </View>
        );
    } else {
        return (
            <View style={homeStyle.container}>
                <Text>You are not authorized to view this page</Text>
            </View>
        )
    };
}

