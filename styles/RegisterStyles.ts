import { Platform, StyleSheet } from 'react-native';

export const registerStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent:'center',
        alignSelf:'center',
        width: Platform.OS === 'android' ? '100%' : '40%',
        backgroundColor:'#9DD4FB'
    },
    Inputfields: {
        height: 40, 
        backgroundColor:'white', 
        marginBottom:4,
        width:"80%", 
        alignContent:'center', 
        borderRadius:5,
        marginLeft:'10%'
    },  
    headertext: {
        fontSize: 30,
        alignSelf: 'center',
        letterSpacing: 3,
        marginTop: 10,
        marginBottom: 40,
    },
    button: {
        color: '#ffffff',
        backgroundColor: '#0274a1',
        width: '80%',
        alignSelf: 'center',
        marginTop: 30,
        height: 40,
        borderRadius: 10,
        fontSize: 20,
        textAlign: 'center',
    },
})
