import { View, Text } from 'react-native';
import { useState } from 'react';
import { profileStyle } from '../styles/ProfileStyles';



export function ProfileView() 
{
    return (
        <View style={profileStyle.container}> 
            <Text>Profile</Text>
        </View>
    );
}