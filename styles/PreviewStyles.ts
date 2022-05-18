import { Platform, StyleSheet } from "react-native";

export const previewStyles = StyleSheet.create({
    container: {
        alignContent: 'flex-end',
        alignSelf: 'flex-end',
        width: Platform.OS === 'android' ? '100%' : '50%',
        borderRadius: 10,
        flex: 1,
    },
    header: {
        flex: 1,
        marginBottom:2,
        backgroundColor:'#9DD4FB'
    },
    headerText: {
        fontSize: 30,
        color: '#000000',
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 50,
    },
    button: {
        justifyContent: 'center',
        backgroundColor: '#0274a1',
        width: '80%',
        alignSelf: 'center',
        marginTop: 30,
        height: 40,
        borderRadius: 10,
    },
    body: {
        flex: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bodyRoom: {
        alignItems: 'center',
        width: '100%',
        padding: 25
    },

    footer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor:'#9DD4FB'


    },
    footerText: {
        fontSize: 20,
        color: '#ffffff',
        alignSelf: 'center',

    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6
    },
    pressables: {
        flex: 1,
    }



});