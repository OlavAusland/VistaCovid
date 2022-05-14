import React, { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { StackParameters, TabParameters } from './domain/NavigationTypes';

import Icon from 'react-native-vector-icons/Fontisto';

//Views
import { RegisterView } from './components/Register';
import { ProfileView } from './components/Profile';
import { LoginView } from './components/Login';
import { RoomView } from './components/Room';
import { AdminView } from './components/Admin';
import { AddRoom } from './components/adminView/addRoomView';
import { ManageRoom } from './components/adminView/manageRoom';
import { HomeView } from './components/Home';
import { ManageRoles } from './components/adminView/manageRoles';


//Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Stack = createNativeStackNavigator<StackParameters>();
const Tab = createMaterialTopTabNavigator<TabParameters>();

function VistaCovid(){
  return(
    <Tab.Navigator tabBarPosition='bottom'>
      {/*<Tab.Screen name="Profile" component={ProfileView}/>*/}
      <Tab.Screen name="Room" component={HomeView} options={{tabBarIcon:() => <Icon name='nav-icon-list-a' size={25}/>}}/>
      <Tab.Screen name="Home" component={RoomView} options={{tabBarIcon:() => <Icon name='home' size={20}/>}}/>
      <Tab.Screen name="Register" component={RegisterView} options={{tabBarIcon:() => <Icon name='ticket-alt' size={25}/>}}/>
      <Tab.Screen name="Profile" component={ProfileView} options={{tabBarIcon:() => <Icon name='person' size={25}/>}}/>
    </Tab.Navigator>
  );
}

export default function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Admin'> 
        <Stack.Screen name="VistaCovid" component={VistaCovid}/>
        <Stack.Screen name="Login" component={LoginView}/>
        <Stack.Screen name="Register" component={RegisterView}/>
        <Stack.Screen name="Admin" component={AdminView}/>
        <Stack.Screen name="AddRoom" component={AddRoom}/>
        <Stack.Screen name="ManageRoom" component={ManageRoom}/>
        <Stack.Screen name="ManageRoles" component={ManageRoles}/>

        {/*<Stack.Screen name="Register" component={RegisterView}/>*/}
      </Stack.Navigator>
    </NavigationContainer>
  );
}