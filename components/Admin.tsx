import { View, Text, Button, ScrollView, SafeAreaView, VirtualizedList } from 'react-native';
import { addRoom, deleteRoom } from '../api/firebaseAPI';
import { Room } from '../domain/RoomType';
import { User } from '../domain/UserType';
import { adminStyle } from '../styles/AdminStyles';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Fontisto';


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
            <ScrollView style={adminStyle.body}>
                    <View style={adminStyle.header}>
                        <Text style={adminStyle.headertext}>OVERSRKIVT</Text>
                    </View>
                    <View>
                        <View style={adminStyle.mainViewButtons}>
                            <TouchableOpacity
                            style={adminStyle.TOmain}
                            onPress={()=>{navigation.navigate('ManageRoom')}}>
                                <Icon2 name='bed-patient'size={30} style={adminStyle.icon}></Icon2>
                                <Text style={adminStyle.buttonText1}>MANAGE ROOMS</Text>
                                <Icon name='arrowright' size={30} style={adminStyle.arowIcon}></Icon>
                            </TouchableOpacity>
                        </View>
                        <View style={adminStyle.mainViewButtons}>
                            <TouchableOpacity
                            style={adminStyle.TOmain}
                            onPress={()=>{navigation.navigate('ManageRoles')}}>
                                <Icon name='addusergroup' size={30} style={adminStyle.icon} ></Icon>
                                <Text style={adminStyle.buttonText2}>MANAGE USERS</Text>
                                <Icon name='arrowright' size={30} style={adminStyle.arowIcon}></Icon>
                            </TouchableOpacity>
                        </View>
                    </View>
            </ScrollView>
        </SafeAreaView>

    );
}
