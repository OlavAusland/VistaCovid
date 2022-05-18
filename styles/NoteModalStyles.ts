import { StyleSheet, Platform } from "react-native"

export const noteModalStyle = StyleSheet.create({
    container: {
        flex:1, 
        justifyContent:'center'
    },
    notes: { 
        alignSelf:'center', 
        width:'90%', 
        height:300, 
        backgroundColor:'white', 
        borderRadius:10
    },
})