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
    //-----------------------Buttons in main admin view---------------------------
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
    //--------------------add room styling-----------------------------
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
    },
    addRoomButton:{
      backgroundColor: 'powderblue',
      padding: 20,
    },
    //---------------manage room styling-----------------------
    editRoom:{
      // height: 40,
      // margin: 12,
      // padding: 10,
    },
    editRoomNumber:{
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    editRoomButton:{
      flex: 2,
      backgroundColor: 'powderblue',
      padding: 50,
    },

    deleteRoom:{
      // height: 40,
      // margin: 12,
      // borderWidth: 1,
      // padding: 10,
    },
    deleteRoomNumber:{
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    deleteRoomButton:{
      flex: 3,
      backgroundColor: 'powderblue',
      padding: 50,
    },

    // --------------------edit room view-------------------------
    editRoomInput:{
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
  },

    //--------------modal styling------------------------------
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
  
})