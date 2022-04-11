import { View, Text } from 'react-native';
import { useState } from 'react';
import { roomStyle } from '../styles/RoomStyles';

export function RoomView()
{
    return(
        <View style={roomStyle.container}>
            <View style={{backgroundColor:'grey', flex:1}}>
                <Text style={{alignContent:'stretch'}}>Room</Text>  
            </View>
            <View style={{backgroundColor:'black', flex:4}}>
                <Text>Room</Text>
            </View>
        </View>
    );
}