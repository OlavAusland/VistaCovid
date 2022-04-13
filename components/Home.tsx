import { useEffect } from 'react';
import { View, Text, Button, TextInput, ScrollView} from 'react-native';
import { homeStyle } from '../styles/HomeStyles';

import { addRoomData, queryRoomsById } from '../api/firebaseAPI';

export function HomeView()
{
    useEffect(() => {
        // addRoomData('awDdlNKxiCpMsHqsE2Rh', 'bloodPressure', {time:2, value:121});

        const getRoomsByKeyword = async () => {
            await queryRoomsById('A2 021').then((res) => {
                console.log(res);
            });
        };
        getRoomsByKeyword();
    }, [])

    return(
        <View style={homeStyle.container}>
            <View style={homeStyle.header}>
                <TextInput placeholder={'Search For Room'} style={homeStyle.searchBar}/>
            </View>
            <ScrollView style={{flex:4}} contentContainerStyle={homeStyle.body}>
                {
                    [1,2,3,4,5, 6, 7, 8, 9].map((res) => {

                        return (
                            <View style={homeStyle.card}>
                                <Text>Room: {res}</Text>
                            </View>
                        )
                    })
                }
            </ScrollView>
        </View>
    );
}