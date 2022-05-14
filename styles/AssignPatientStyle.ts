import { StyleSheet, Platform } from 'react-native';

export const assignPatientStyle = StyleSheet.create({
   
    container: {
        alignContent:'center',
        alignSelf:'center',
        width: Platform.OS === 'android' ? '100%' : '50%',
        height: '100%',
        backgroundColor: '#9dd4fb',
        paddingLeft: 20,
        paddingRight: 20,
        padding: 20,
        elevation: 5,
       
    },
    text: { 
        backgroundColor: 'white',
        padding: 10,
    },
    button: { 
        backgroundColor: '#0274a1',
        width: 150,
        alignSelf:'center',
        marginTop: 30,
        height: 40,
        borderRadius: 10,
        marginRight:20,
    },
    newpatientinput:{
        height: 40,
        backgroundColor: 'white',
        paddingLeft:4,
        marginBottom:8
    },
    newPatientButton: { 
        backgroundColor: '#0274a1',
        width: 130,
        height: 30,
        borderRadius: 10,
        marginTop: 5,
        flexDirection:'row',
       
    },
})
