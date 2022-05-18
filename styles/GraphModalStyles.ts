import { Platform, StyleSheet } from 'react-native';

export const graphModalStyle = StyleSheet.create({
    container: {
        backgroundColor:'rgba(0, 0, 0, 0)', 
        justifyContent:'center', 
        alignItems:'center',
        alignSelf:'center',
        width: Platform.OS === ('android' || 'ios') ? '100%' : '50%',
        height: Platform.OS === ('android' || 'ios') ? '100%' : '50%',
    },
    notes: {
        backgroundColor:'rgba(0, 0, 0, 0.05)', 
        width:'90%',
        height:400
    }
});