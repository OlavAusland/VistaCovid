import { StyleSheet, Platform } from 'react-native';

export const roomStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent:'center',
        alignSelf:'center', 
        width: Platform.OS === 'android' ? '100%' : '50%',
        backgroundColor:'rgba(0, 0, 0, 0)'
    },
    header: {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    headerText: {
        fontSize:40,
        fontWeight:'bold'
    },
    body: {
        flex:1,
        alignItems:'center'
    }
})