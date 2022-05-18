// navigation
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, SafeAreaView, ScrollView, View } from 'react-native';
import { StackParameters } from '../domain/NavigationTypes';
import { adminStyle } from '../styles/AdminStyles';


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
                    <View style={adminStyle.manageRoom}>
                        <Button title='Register User' onPress={() => {navigation.navigate('Register')}}></Button>
                    </View>
            </SafeAreaView>
        </ScrollView>
    );
}
