import { StyleSheet, Platform } from 'react-native';

export const safetyModalStyle = StyleSheet.create({
    container: {
        flex:1, 
        alignItems:'center', 
        justifyContent:'center'
    },
    div: {
        backgroundColor:"#DDDDDD", 
        width:"90%", 
        height:250, 
        shadowColor:'black'
    },
    inputSection: {
        flex:1, 
        alignItems:'center', 
        marginTop:'5%'
    }, 
    input: {
        height: 40, 
        width:'90%', 
        borderColor: 'gray', 
        borderWidth: 1
    },  
    options: {
        flex:1, 
        justifyContent:'flex-end'
    }
})
