import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { StackParameters, TabParameters } from './domain/NavigationTypes';
import React from 'react';

//Views
import { RegisterView } from './components/Register';
import { ProfileView } from './components/Profile';
import { LoginView } from './components/Login';
import { RoomView } from './components/Room';
import { AdminView } from './components/Admin';
import { AddRoom } from './components/adminView/addRoomView';
import { EditRoom } from './components/adminView/editRoomView';
import { ManageRoom } from './components/adminView/manageRoom';
import { HomeView } from './components/Home';

//Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Stack = createNativeStackNavigator<StackParameters>();
const Tab = createMaterialTopTabNavigator<TabParameters>();

function VistaCovid(){
  return(
    <Tab.Navigator screenOptions={{tabBarShowLabel:false, tabBarShowIcon:false}}>
      <Tab.Screen name="Profile" component={ProfileView}/>
      <Tab.Screen name="Home" component={HomeView}/>
      <Tab.Screen name="Room" component={RoomView}/>
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
        <Stack.Screen name="EditRoom" component={EditRoom}/>
        <Stack.Screen name="ManageRoom" component={ManageRoom}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}