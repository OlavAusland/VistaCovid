import { StyleSheet, Platform} from "react-native";

export const profileStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent:'center',
        alignSelf:'center',
        width: Platform.OS === 'android' ? '100%' : '50%',
        backgroundColor:'rgba(0, 0, 0, 0)'
    },
    body:{
        flex: 1
    },
    column1:{
        flex:1, 
        justifyContent:'center', 
        alignItems:'center', 
        flexDirection:"row", 
        backgroundColor:'white', 
        elevation:6
    },
    imageStyle:{
        flex:1, 
        width: 200,
        height: 200,
        borderRadius: 200/2,
        paddingLeft: 20
    },
    nameStyle:{
        flex:1,
        marginTop:50,
        fontSize: 20
    },
    emailStyle:{
        flex: 1,
        fontSize: 20
    },
    userStyle:{
        flex:1, flexDirection:'column', justifyContent:'center'
    },
    uploadImageButtonStyle:{
        flex:1, backgroundColor:'white', justifyContent:'center', alignItems:'center'
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
        alignItems:'center'
    },
    shadow:{
        shadowColor: "#000", 
        shadowOffset: { width: 0,height: 3,},
        shadowOpacity: 0.27,
        shadowRadius: 4.65, 
        elevation: 6
    }
})