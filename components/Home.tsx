import React, { useEffect, useReducer, useState } from 'react';
import { View, Text, Button, TextInput, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { homeStyle } from '../styles/HomeStyles';
import { BarChart } from 'react-native-chart-kit';
import { Room } from '../domain/RoomType';
import { getLoggedInUser, getRole, getRooms } from '../api/firebaseAPI';
import { AssignPatientModal } from "./home/AssignPatientToRoomModal"
import Icon from 'react-native-vector-icons/Fontisto';
import { currentUser, Roles } from '../domain/UserType';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParameters, TabParameters } from '../domain/NavigationTypes';
import { auth } from '../firebase-config';
import { AdminView } from './Admin';
import { sendEmail } from '../utils/email-sender';

type  HomeScreenProps = NativeStackScreenProps<TabParameters, 'Home'>

export const HomeView = (props: HomeScreenProps) => {
    const [rooms, setRooms] = useState<Room[]>([])
    const [modalVisible, setModalVisible] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [user, setUser] = useState<currentUser>({email: '', firstName: '', lastName: '', role: Roles.NONE, id:''});
    const [isLoading, setIsLoading] = useState(true);


    const handleRequestClose = () => {
        setModalVisible(false);
    }
    useEffect(() => {
        const getRoomsData = async () => {
            await getRooms().then((res) => {
                setRooms(res);
            }).catch((err) => { console.log(err) });
        };
        getRoomsData();
    }, []);

    useEffect(() => {
        const getFirebaseRole = async() => {
            await getRole('DbtASNrPoTf7ysGZy0LujG5lPXq2').then((role) => {
                if(role !== undefined)
                    setUser(prev => ({...prev, role: Roles[role?.toUpperCase() as keyof typeof Roles]}));
                    setIsLoading(false);
            }).catch((err) => {console.log(err)});  
        }
        getFirebaseRole();
    }, []);
/* 
    useEffect(() => {
        const getUserData = () => {
             getLoggedInUser().then((res) => {
                setUser(res);
            }).catch((err) => { console.log(err) });
        };
        getUserData();
    }, []); */

    if(user.role == Roles.ADMIN)
    {
        return(
            <AdminView/>
        );
    }else if(user.role == Roles.NURSE || user.role == Roles.DOCTOR)
    {
        return (
            <View style={homeStyle.container}>
                <View style={homeStyle.header}>
                    <TextInput onChangeText={(text) => {setKeyword(text)}} placeholder={'Search For Room'} style={homeStyle.searchBar} />
                </View>
                { user.role == Roles.DOCTOR &&
                    <View style={{ paddingBottom: 10 }}>
                        <TouchableOpacity onPress={() => { setModalVisible(true) }} style={{ flexDirection: 'row', justifyContent: 'center', backgroundColor: '#C1E8FD' }}>
                            <Text style={{ fontSize: 20, paddingTop: 5 }}>Assign Patient</Text>
                            <Icon name='bed-patient' size={40} style={{ alignSelf: 'center', paddingLeft: 10 }} onPress={() => { setModalVisible(true) }} />
                        </TouchableOpacity>
                        <AssignPatientModal modalVisible={modalVisible} handleRequestClose={handleRequestClose} user={user} />
                    </View>
                }
                <View style={{ flex: 4 }}>
                    <ScrollView contentContainerStyle={[homeStyle.body]}>
                        {rooms.length > 0 &&
                            rooms.filter((room) => {if(room.patientId != '' && room.roomNumber.includes(keyword)){return room}}).map((room: Room) => {
                                return (
                                    <TouchableOpacity key={'room:' + room.roomNumber} style={homeStyle.card}
                                    onPress={() => {props.navigation.push('Room', {roomId:room.id})}}>
                                        <BarChart
                                            data={{
                                                labels: ['BL', 'O2', 'HR'],
                                                datasets: [{
                                                    data: [room.bloodPressure ? room.bloodPressure[room.bloodPressure.length - 1].value : 0,
                                                    room.oxygenLevel ? room.oxygenLevel[room.oxygenLevel.length - 1].value : 0,
                                                    room.heartRate ? room.heartRate[room.heartRate.length - 1].value : 0]
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
                                            <Text> Room: {room.roomNumber}</Text>
                                            <Text> Patient: {room.patientId ? room.patientId : 'No Patient'}</Text>
                                        </View>
                                        <View style={{flex:1, backgroundColor:['yellow', 'red', 'green'][~~(Math.random()*3)]}}/>
    
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </ScrollView>
                </View>
            </View>
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