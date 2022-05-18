import { Platform, StyleSheet } from 'react-native';

export const registerStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent:'center',
        alignSelf:'center',
        width: Platform.OS === 'android' ? '100%' : '40%',
        backgroundColor:'rgba(0, 0, 0, 0)'
    }
})
