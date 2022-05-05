import { StyleSheet, Platform} from "react-native";

export const profileStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent:'center',
        alignSelf:'center',
        width: Platform.OS === 'android' ? '100%' : '100%',
        backgroundColor: '#0274a1',
    }
})