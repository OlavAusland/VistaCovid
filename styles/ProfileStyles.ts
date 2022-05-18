import { Platform, StyleSheet } from "react-native";

export const profileStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent:'center',
        alignSelf:'center',
        width: Platform.OS === 'android' ? '100%' : '50%',
        backgroundColor:'rgba(0, 0, 0, 0)'
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