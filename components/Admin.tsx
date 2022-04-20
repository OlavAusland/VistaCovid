import { View, Text, Button, ScrollView } from 'react-native';
import { isPropertySignature } from 'typescript';
import { addUser, addRoom } from '../api/firebaseAPI';
import { Room } from '../domain/RoomType';
import { User } from '../domain/UserType';
import { adminStyle } from '../styles/AdminStyles';

// navigation
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParameters } from '../domain/NavigationTypes';

export function AdminView()
{
    const newroom: Room = {
        patientId:'None',
        roomNumber: 'A2 023',
        lastUpdated: Date.now().toString(),
        heartRate: [{time: 0, value: 62}, {time: 1, value: 32}],
        bloodPressure: [{time: 0, value: 122}, {time: 1, value: 82}],
        oxygenLevel: [{time: 0, value: 102}, {time: 1, value: 92}],
        notes: [{role: 3, note: 'This is a another new note'}]
    }

    const newuser: User = {
        email: 'string',
        password: 'string',
        code: 'string',
        firstName: 'string',
        lastName: 'string',
        role: 3,
        phone: 'string',
        address: 'string',
        city: 'string'
    }


    const navigation = useNavigation<NativeStackNavigationProp<StackParameters>>();

    return(
        <ScrollView>
            <View style={adminStyle.container}>
                <View style={adminStyle.header}>
                    <Text style={adminStyle.text}>Admin View</Text>
                </View>
                <View>
                    <View style={adminStyle.addRoom}>
                        <Button title='Add Room' onPress={() => {addRoom(newroom)}}></Button>
                    </View>
                    <View style={adminStyle.manageRoles}>
                    <Text>This is some text on the page</Text>
                    <Button title='Manage Roles' onPress={() => {navigation.navigate('ManageRoles')} }></Button>
                    </View>
                </View>
            </View>
    
        </ScrollView>

    );
}