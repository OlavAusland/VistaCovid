import { useEffect, useState} from 'react';
import { View, Text, Button, TextInput, ScrollView, Dimensions, TouchableOpacity} from 'react-native';
import { homeStyle } from '../styles/HomeStyles';
import { BarChart } from 'react-native-chart-kit';
import { Room } from '../types/RoomType';
import { getRooms } from '../api/firebaseAPI';

export function HomeView()
{
    const [rooms, setRooms] = useState<Room[]>([])

    useState(() => {
        const getRoomsData = async () => {
            await getRooms().then((res) => {
                setRooms(res);
            }).catch((err) => {console.log(err)});
        };
        getRoomsData();
    }, []);

    return(
        <View style={homeStyle.container}>
            <View style={homeStyle.header}>
                <TextInput placeholder={'Search For Room'} style={homeStyle.searchBar}/>
            </View>
            <View style={{flex:4}}>    
                <ScrollView contentContainerStyle={homeStyle.body}>
                    {rooms.length > 0 &&
                        rooms.map((room: Room) => {
                            return (
                                <TouchableOpacity key={'room:' + room.roomNumber} style={homeStyle.card}>
                                    <BarChart
                                        data={{
                                            labels: ['BL', 'OXL', 'HR'],
                                            datasets: [{
                                                data: [room.bloodPressure ? room.bloodPressure[room.bloodPressure.length - 1].value : 0, 
                                                        room.oxygenLevel ? room.oxygenLevel[room.oxygenLevel.length - 1].value : 0,
                                                         room.heartRate ? room.heartRate[room.heartRate.length - 1].value : 0]
                                            }]
                                        }}
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
                                                flex:2
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
                                        <Text style={{flex:1}}> Room: {room.roomNumber}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>
            </View>
        </View>
    );
}