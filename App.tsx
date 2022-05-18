import 'react-native-gesture-handler';
import { DrawerParameters, StackParameters, TabParameters } from './domain/NavigationTypes';

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
import { CreateUser } from './components/adminView/registerUser';
import { Export } from './components/Export';

//Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { auth } from './firebase-config';
import { getRole } from './api/firebaseAPI';
import { useEffect, useState } from 'react';



const Stack = createNativeStackNavigator<StackParameters>();
const Tab = createMaterialTopTabNavigator<TabParameters>();
const Drawer = createDrawerNavigator<DrawerParameters>();


function Menu() {
const [role, setRole] = useState<string>();

  useEffect(() => {
    const getFirebaseRole = async() => {
      if(auth.currentUser){ 
        const role = await getRole(auth.currentUser?.uid);
        setRole(role?.toLowerCase());
      }
    }; getFirebaseRole();
  }, []);




  return (
    <Drawer.Navigator  screenOptions={{headerTitle:''}} drawerContent={props => {
      return (
        <DrawerContentScrollView>
         {role === "doctor" && <DrawerItem label="Export" onPress={() => {props.navigation.navigate("Export");}} />}
          <DrawerContentScrollView>
            {[1,2,3,4,5,6].map((i) => {return (<DrawerItem style={{backgroundColor:''}}label={`Tab ${i}`} key={i} onPress={() => {}}/>)})}
          </DrawerContentScrollView>
          <DrawerItem label="LogOut"onPress={() => {auth.signOut(); props.navigation.navigate("Login");}} />
        </DrawerContentScrollView>
      )
    }}>
      <Drawer.Screen name="VistaCovid" component={VistaCovid}/>
    </Drawer.Navigator>
  );
  
}

function VistaCovid(){
  return(
    <Tab.Navigator tabBarPosition='bottom'>
      <Tab.Screen name="Home" component={HomeView} options={{tabBarIcon:() => <Icon name='nav-icon-list-a' size={20}/>}}/>
      {/*<Tab.Screen name="Register" component={RegisterView} options={{tabBarIcon:() => <Icon name='ticket-alt' size={25}/>}}/>*/}
      <Tab.Screen name="Profile" component={ProfileView} options={{tabBarIcon:() => <Icon name='person' size={25}/>}}/>
    </Tab.Navigator>
  );
}

export default function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Login'> 
        <Stack.Screen name="Menu" component={Menu}/>
        <Stack.Screen name="Login" component={LoginView}/>
        <Stack.Screen name="Register" component={RegisterView}/>
        <Stack.Screen name="Admin" component={AdminView}/>
        <Stack.Screen name="AddRoom" component={AddRoom}/>
        <Stack.Screen name="ManageRoom" component={ManageRoom}/>
        <Stack.Screen name="ManageRoles" component={ManageRoles}/>
        <Stack.Screen name="CreateUser" component={CreateUser}/>
        <Stack.Screen name="Export" component={Export}/>
        <Stack.Screen name="Room" component={RoomView} initialParams={{roomId:'A2 021'}}/>
        {/*<Stack.Screen name="Register" component={RegisterView}/>*/}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
