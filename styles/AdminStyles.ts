import { StyleSheet, Platform} from "react-native";

export const adminStyle = StyleSheet.create({
  body:{
    // backgroundColor: '#E5FCFF'
  },
    container: {
        // backgroundColor: '#E5FCFF'
    },
    header: {
        flex: 1,
        backgroundColor: '#E5FCFF',
        paddingTop: 30,
        alignItems: 'center',
    },
    headertext:{
        fontSize: 30,
    },
    //-----------------------Buttons in main admin view---------------------------
    mainViewButtons: {
        flex: 2,
        backgroundColor: '#E5FCFF',
        padding:50,
        alignItems: 'center',
    },

    addRoom:{
      backgroundColor:'#9DD4FB',
      alignItems: 'center',
      borderColor: '#0274A1',
      borderWidth: 2,
      borderRadius: 10,
      alignSelf: 'flex-start',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.46,
      shadowRadius: 11.14,
      
      elevation: 17,
    },
    
    // manageRoom:{
    //   backgroundColor:'#9DD4FB',
    //   alignItems: 'center',
    //   borderColor: '#0274A1',
    //   borderWidth: 2,
    //   borderRadius: 10,
    //   alignSelf: 'flex-start'
    // },

    manageUsers:{
      backgroundColor:'#9DD4FB',
      alignItems: 'center',
      borderColor: '#0274A1',
      borderWidth: 2,
      borderRadius: 10,
      alignSelf: 'flex-start'

    },
    buttonText:{
      padding: 50,
      fontSize: 25
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

    // --------------------manage roles view-------------------------
   managerolesheader:{
      alignItems: "center",
      padding:10
   },

   manageRoleText:{
     fontSize: 20
   },

   addUserButton:{
     padding: 20,
     width: 500
   },
    searchBar: {
      backgroundColor:'#C1E8FD',
      width: '50%',
      height: 30,
      borderRadius:5,
      shadowColor:'rgba(0, 0, 0, 0.2)',
      shadowOffset:{width:0, height:3},
      shadowOpacity:0.8,
      shadowRadius:2,
      elevation:1, 
      padding: 20
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