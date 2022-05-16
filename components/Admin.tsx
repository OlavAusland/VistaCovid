import { View, Text, Button, ScrollView, SafeAreaView } from 'react-native';
import { addRoom, deleteRoom } from '../api/firebaseAPI';
import { Room } from '../domain/RoomType';
import { User } from '../domain/UserType';
import { adminStyle } from '../styles/AdminStyles';

// navigation
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParameters } from '../domain/NavigationTypes';
import { TouchableOpacity } from 'react-native-gesture-handler';

export function AdminView()
{

    const navigation = useNavigation<NativeStackNavigationProp<StackParameters>>();


    return(
        <SafeAreaView>
            <ScrollView style={adminStyle.container}>
                    <View style={adminStyle.header}>
                        <Text style={adminStyle.headertext}>Manage</Text>
                    </View>
                    <View>
                        <View style={adminStyle.mainViewButtons}>
                            <TouchableOpacity
                            style={adminStyle.addRoom}
                            onPress={()=>{navigation.navigate('ManageRoom')}}>
                                <Text style={adminStyle.buttonText}>Manage Room</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={adminStyle.mainViewButtons}>
                            <TouchableOpacity
                            style={adminStyle.addRoom}
                            onPress={()=>{navigation.navigate('ManageRoles')}}>
                                <Text style={adminStyle.buttonText}>Manage Users</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
            </ScrollView>
        </SafeAreaView>

    );
}
