import { StyleSheet, Platform} from "react-native";

export const profileStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignSelf:'center',
        width: Platform.OS === 'android' ? '100%' : '50%',
        backgroundColor:'black'
    }
})