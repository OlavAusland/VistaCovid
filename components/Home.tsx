import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { homeStyle } from '../styles/HomeStyles';
import { BarChart } from 'react-native-chart-kit';
import { Room } from '../domain/RoomType';
import { getLoggedInUser, getRooms } from '../api/firebaseAPI';
import { AssignPatientModal } from "./home/AssignPatientToRoomModal"
import Icon from 'react-native-vector-icons/Fontisto';
import { currentUser, Roles } from '../domain/UserType';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParameters, TabParameters } from '../domain/NavigationTypes';
import { Errormodal } from './ErrorModal';
import { ErrorType } from '../domain/Errortype';

type  HomeScreenProps = NativeStackScreenProps<TabParameters, 'Home'>

export const HomeView = (props: HomeScreenProps) => {
    const [rooms, setRooms] = useState<Room[]>([])
    const [modalVisible, setModalVisible] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [User, setUser] = useState<currentUser>({email: '', firstName: '', lastName: '', role: Roles.NONE, id:''});
    const [error, setError] = useState<ErrorType>({errorObject:undefined, errormodalVisible:false});



    const handleRequestClose = () => {
        setModalVisible(false);
        setError(false);
    }

    useEffect(() => {
        const getRoomsData = async () => {
            await getRooms().then((res) => {
                setRooms(res);
            }).catch((err) => { console.log(err) });
        };
        getRoomsData();
    }, []);

        if(modalVisible){
            return (
                <AssignPatientModal modalVisible={modalVisible} handleRequestClose={handleRequestClose} user={User} />
            )
        }

    return (
        <View style={homeStyle.container}>
            <View style={homeStyle.header}>
                <TextInput onChangeText={(text) => {setKeyword(text)}} placeholder={'Search For Room'} style={homeStyle.searchBar} />
            </View>
            <View style={{ paddingBottom: 10 }}>
                <TouchableOpacity onPress={() => { setModalVisible(true) }} style={{ flexDirection: 'row', justifyContent: 'center', backgroundColor: '#C1E8FD' }}>
                    <Text style={{ fontSize: 20, paddingTop: 5 }}>Assign Patient</Text>
                    <Icon name='bed-patient' size={40} style={{ alignSelf: 'center', paddingLeft: 10 }} onPress={() => { setModalVisible(true) }} />
                </TouchableOpacity>
               
               <Errormodal errormessage={errormessage} handleRequestClose={handleRequestClose} errorModalVisible={errorModalVisible} ></Errormodal>

            </View>
            <View style={{ flex: 4 }}>
                <ScrollView contentContainerStyle={homeStyle.body}>
                    {rooms.length > 0 &&
                        rooms.filter((room) => {if(room.patientId != '' && room.roomNumber.includes(keyword)){return room}}).map((room: Room) => {
                            return (
                                <TouchableOpacity key={'room:' + room.roomNumber} style={homeStyle.card}
                                onPress={() => {props.navigation.push('Room', {roomId:room.id})}}>
                                    <BarChart
                                        data={{
                                            labels: ['BL', 'OXL', 'HR'],
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
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text> Room: {room.roomNumber}</Text>
                                        <Text> Patient: {room.patientId ? room.patientId : 'No Patient'}</Text>
                                    </View>

                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>
            </View>
        </View>
    );
}