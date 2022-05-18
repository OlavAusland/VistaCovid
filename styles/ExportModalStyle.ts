import { Platform, StyleSheet } from "react-native";

export const exportStyles = StyleSheet.create({
    bodyScrollcontent: {
        flexDirection: 'row',
        marginBottom:20,
        alignItems:'center',
        paddingLeft:10,
        paddingTop:10
    },
    bodyScrollText: {
        fontSize: 25,
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6
    }
});