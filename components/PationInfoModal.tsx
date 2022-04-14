import { View, Text, Button } from 'react-native';
import { useState } from 'react';
import { profileStyle } from '../styles/ProfileStyles';

import { Room } from '../domain/RoomType';

import { getPatient } from '../api/folkeregisterModelAPI';



export const PatientModal =() => {
    const data = getPatient("26049915645")
        
    
    return (
        <View style={profileStyle.container}>
            {/*HEADER*/}
            <View style={{flex:1}}>
                <Text style={{alignSelf:'center'}}>Profile</Text>
                <Button title="Add Room" onPress={() => {getPatient("12212121212")} }/>
            </View>
        </View>
    );
}