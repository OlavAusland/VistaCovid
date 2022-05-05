import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { StackParameters, TabParameters } from './domain/NavigationTypes';
import React from 'react';

//Views
import { RegisterView } from './components/Register';
import { LoginView } from './components/Login';
import { RoomView } from './components/Room';
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
      <Tab.Screen name="Home" component={HomeView}/>
      <Tab.Screen name="Room" component={RoomView}/>
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Login'> 
        <Stack.Screen name="VistaCovid" component={VistaCovid}/>
        <Stack.Screen name="Login" component={LoginView}/>
        <Stack.Screen name="Register" component={RegisterView}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}