import { StyleSheet, Platform } from 'react-native';

export const loginStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent:'center',
        alignSelf:'center',
        width: Platform.OS === 'android' ? '90%' : '40%'
    }
})
