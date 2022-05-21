import { View, Text,  ScrollView, SafeAreaView } from 'react-native';
import { adminStyle } from '../styles/AdminStyles';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/MaterialIcons';


// navigation
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParameters } from '../domain/NavigationTypes';
import { TouchableOpacity } from 'react-native-gesture-handler';

export function AdminView() {

    const navigation = useNavigation<NativeStackNavigationProp<StackParameters>>();


    return(
        <SafeAreaView style={{flex:1}}>
            <ScrollView contentContainerStyle={{flex:1}}>
                <View style={adminStyle.body}>
                    <View style={adminStyle.header}>
                        <Text style={adminStyle.headertext}>ADMIN</Text>
                    </View>
                    <View style={{flex:8}}>
                        <View style={adminStyle.mainViewButtons}>
                            <TouchableOpacity
                            style={adminStyle.TOmain}
                            onPress={()=>{navigation.navigate('ManageRoom')}}>
                                <Icon3 name='meeting-room' size={30} style={adminStyle.buttonIcon} ></Icon3>
                                <Text style={adminStyle.buttonText1}>MANAGE ROOMS</Text>
                                <Icon name='arrowright' size={30} style={adminStyle.arrowIcon}></Icon>
                            </TouchableOpacity>
                        </View>
                        <View style={adminStyle.mainViewButtons}>
                            <TouchableOpacity
                            style={adminStyle.TOmain}
                            onPress={()=>{navigation.navigate('Register')}}>
                                <Icon name='adduser' size={30} style={adminStyle.buttonIcon} ></Icon>
                                <Text style={adminStyle.buttonText2}>REGISTER USER</Text>
                                <Icon name='arrowright' size={30} style={adminStyle.arrowIcon}></Icon>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>

    );
}
