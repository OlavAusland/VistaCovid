import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
//Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { Platform, Vibration } from 'react-native';
import 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Fontisto';
import { getRole } from './api/firebaseAPI';
import { AdminView } from './components/Admin';
import { AddRoom } from './components/adminView/addRoomView';
import { ManageRoles } from './components/adminView/manageRoles';
import { ManageRoom } from './components/adminView/manageRoom';
import { Export } from './components/Export';
import { HomeView } from './components/Home';
import { LoginView } from './components/Login';
import { ProfileView } from './components/Profile';
//Views
import { RegisterView } from './components/Register';
import { RoomView } from './components/Room';
import { DrawerParameters, StackParameters, TabParameters } from './domain/NavigationTypes';
import { GraphData, Room } from './domain/RoomType';
import { auth, db } from './firebase-config';


const Stack = createNativeStackNavigator<StackParameters>();
const Tab = createMaterialTopTabNavigator<TabParameters>();
const Drawer = createDrawerNavigator<DrawerParameters>();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldFlash:true,
    shouldSetBadge: true,

  }),
});

const DetectDanger = (min:number, max:number, data:GraphData[]) => {
  const values = data.length > 0 ? data.map((res: GraphData) => {return res.value}) : [];
  return values.some((res: number) => {return res > max || res < min});
}

// APP

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
    <Drawer.Navigator  screenOptions={{headerTitle:'VistaCovid'}} drawerContent={props => {
      return (
        <DrawerContentScrollView>
         {role === "doctor" && <DrawerItem label="Export" onPress={() => {props.navigation.navigate("Export");}} />}
          <DrawerContentScrollView>
            {[1,2,3,4,5,6].map((i) => {
              return (
                <DrawerItem style={{backgroundColor:''}}label={`Tab ${i}`} key={i} onPress={() => {}}/>
              )
              })}
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
  const [expoPushToken, setExpoPushToken] = useState<string>('');
  const [notification, setNotification] = useState<any>(false);
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token: string | undefined) => {if(token !== undefined){setExpoPushToken(token)}});

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    const q = query(collection(db, 'Rooms'), where('patientId', '!=', ''));
    onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach(async(doc) => {
          const room = {...doc.data(), id:doc.id} as Room;
          console.log(room.id)
          
          if(DetectDanger(10, 100, room.heartRate))
            sendPushNotification({to:expoPushToken, sound:'default', title:`${room.id}: 
            Heart Rate = ${room.heartRate[room.heartRate.length -1].value}`}).then(() => console.log('sent'));
          if(DetectDanger(10, 100, room.respirationRate))
            sendPushNotification({to:expoPushToken, sound:'default', title:`${room.id}: 
            Respiration Rate = ${room.respirationRate[room.respirationRate.length -1].value}`}).then(() => console.log('sent'));
          if(DetectDanger(10, 100, room.oxygenLevel))
            sendPushNotification({to:expoPushToken, sound:'default', title:`${room.id}:\n
            Oxygen Level = ${room.oxygenLevel[room.oxygenLevel.length -1].value}`}).then(() => console.log('sent'));
        });
    });
  }, []);

  return(
    <Tab.Navigator tabBarPosition='bottom'>
      <Tab.Screen name="Home" component={HomeView} options={{tabBarIcon:() => <Icon name='home' size={23}/>}}/>
      {/*<Tab.Screen name="Register" component={RegisterView} options={{tabBarIcon:() => <Icon name='ticket-alt' size={25}/>}}/>*/}
      <Tab.Screen name="Profile" component={ProfileView} options={{tabBarIcon:() => <Icon name='person' size={25}/>}}/>
    </Tab.Navigator>
  );
}

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications
async function sendPushNotification(message: object) {
  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
  Vibration.vibrate(1000);
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
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
        
        <Stack.Screen name="Export" component={Export}/>
        <Stack.Screen name="Room" component={RoomView} initialParams={{roomId:'A2 021'}}/>
        {/*<Stack.Screen name="Register" component={RegisterView}/>*/}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
