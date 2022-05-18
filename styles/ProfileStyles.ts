import { StyleSheet, Platform} from "react-native";
//COLORS (light to dark):
// FFF2EA
// #E5FDFF
// #C1E8FD
// #9DD4FB
// #0274A1
export const profileStyle = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignContent:'center',
        alignSelf:'center',
        width: Platform.OS === 'android' ? '100%' : '50%',
        backgroundColor:'rgba(0, 0, 0, 0)'
    },
    first: {
        backgroundColor: 'white'
    },
    second:{
        backgroundColor: '#E5FDFF'
    },

    header:{
        fontSize: 30,
        alignSelf: 'center',
        letterSpacing: 3,
    },
    row1:{
        alignItems:'center', 
        padding: 5
    },
    imageStyle:{
        width: 200,
        height: 200,
        borderRadius: 10,        
    },
    textStyle:{
        fontSize: 20
    },
  
    userStyle:{
        alignItems: 'center',
        backgroundColor: '#E5FDFF',
        padding: 10,
    },

    box: {
        backgroundColor: '#E5FDFF',
        padding: 20,
        borderRadius: 5,
        flexDirection: 'row'

    },

    uploadImageButtonStyle:{
        justifyContent:'center', 
        alignItems:'center',
        paddingTop: 10,
        paddingBottom: 10
    },
    buttonTextStyle:{
        fontSize:20
    },
    upload:{
        width:'75%',
        backgroundColor:'#9DD4FB',
        paddingTop:10,
        paddingBottom:10,
        borderRadius:10,
        alignItems:'center',
        borderColor: 'white',
        borderWidth: 4
    },
    shadow:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        
        elevation: 15,
    }
})