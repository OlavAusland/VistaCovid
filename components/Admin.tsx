import { View, Text, Button, ScrollView, SafeAreaView } from 'react-native';
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
            <View style={adminStyle.manageRoom}>
                        <Button title='Manage Rooms' onPress={() => {navigation.navigate('ManageRoom')}}></Button>
                    </View>
                    <View style={adminStyle.manageRoom}>
                        <Button title='Manage Users' onPress={() => {navigation.navigate('ManageRoles')}}></Button>
                    </View>
            </SafeAreaView>
        </ScrollView>
    );
}
