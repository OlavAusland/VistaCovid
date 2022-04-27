import { StyleSheet, Platform} from "react-native";

export const adminStyle = StyleSheet.create({
    container: {
        //marginTop: 20,
        backgroundColor: '#E5FCFF'
    },
    header: {
        flex: 1,
        backgroundColor: 'powderblue',
        padding: 30,
        alignItems: 'center',
    },
    headertext:{
        fontSize: 30,
    },
    addRoom: {
        flex: 2,
        backgroundColor: 'powderblue',
        padding: 50,
        // marginTop:3,
        // marginBottom:3,
        // marginLeft:3,
        // marginRight:3
    },
    manageRoom: {
        flex: 3,
        backgroundColor:'powderblue',
        padding: 50,
        // marginBottom:3,
        // marginLeft:3,
        // marginRight:3
    },
    addRoomContainer: {
        //marginTop: 20,
        backgroundColor: 'powderblue'
    },
    addRoomHeader:{
        flex: 1,
        backgroundColor: 'powderblue',
        padding: 30,
        alignItems: 'center',
    },
    addRoomInput:{
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    }
  
})