import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import createSender from "../utils/register";
import { addNotificationReceivedListener, removeNotificationSubscription} from "expo-notifications";

export default function Notification() {
  // Function that will hold our push notification send function (an object with the function)
  const [sender, setSender] = useState<any>(undefined); 

  // useEffect to get token and create sender, add listener for alerts
  useEffect(() => {
    // create send function promise
    const s = createSender();
    // add notification listener to trigger events when notification is sent
    addNotificationReceivedListener((notification) => {
      console.log("Notification Coming!");
      console.log(notification);
    });
    // add function to state when send promise resolves
    s.then((sendFunc) => {
      console.log(typeof sendFunc);
      setSender({ sendFunc });
    });
  }, [false]);

  // useEffect that will send push alert
  useEffect(() => {
    // if the send function exists, send a notification
    if (sender && sender.sendFunc instanceof Function) {
      console.log(sender);
      sender.sendFunc("hello");
    }
  }, [sender]);
}
