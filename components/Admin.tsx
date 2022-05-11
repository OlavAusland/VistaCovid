import React, { View, Text, Button, ScrollView, SafeAreaView } from 'react-native';
import { isPropertySignature } from 'typescript';
import { addRoom, deleteRoom } from '../api/firebaseAPI';
import { Room } from '../domain/RoomType';
import { User } from '../domain/UserType';
import { adminStyle } from '../styles/AdminStyles';

// navigation
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParameters } from '../domain/NavigationTypes';

export function AdminView()
{

    const navigation = useNavigation<NativeStackNavigationProp<StackParameters>>();


    return(
        <ScrollView style={adminStyle.container}>
            <SafeAreaView>
                <View style={adminStyle.header}>
                    <Text style={adminStyle.headertext}>Admin View</Text>
                </View>
                <View>
                    <View style={adminStyle.addRoom}>
                        <Button title='Add Room' onPress={() => {navigation.navigate('AddRoom')}}></Button>
                    </View>
                    <View style={adminStyle.manageRoom}>
                    <Button title='Manage Room' onPress={() => {navigation.navigate('ManageRoom')}}></Button>
                    </View>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
}