import { Platform, StyleSheet } from "react-native";

export const exportStyles = StyleSheet.create({
    container: {
        alignContent: 'flex-end',
        alignSelf: 'flex-end',
        width: Platform.OS === 'android' ? '100%' : '50%',
        backgroundColor: '#000000',
        borderRadius: 10,
        flex: 1,
    },
    header: {
        flex: 1,
    },
    headerText: {
        fontSize: 30,
        color: '#ffffff',
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
        flex: 7,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },
    bodyRoom: {
        flex: 4,
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'red',
    },
    bodyText: {
        fontSize: 20,
        color: '#000000',
        textAlign: 'center',
        marginTop: 20,
    },
    bodyDate: {
        flex: 3,
        fontSize: 20,
        color: '#000000',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 30,
        backgroundColor: 'blue',
        width: '100%',
    },
    bodyScroll: {
        flex: 4,
        backgroundColor: 'white',
        width: '80%',
        padding: 10,

    },
    bodyScrollcontent: {
        flexDirection: 'row',
    },
    bodyScrollText: {
        fontSize: 30,
        marginLeft: 10,

    },
    footer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'grey',

    },
    footerText: {
        fontSize: 20,
        color: '#ffffff',
        alignSelf: 'center',

    },
    dateButton: {
        justifyContent: 'center',
        backgroundColor: '#0274a1',
        width: '40%',
        alignSelf: 'center',
        height: 40,
        borderRadius: 10,


    },
    buttonRows: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        marginLeft: '10%',
        marginRight: '13%',
        width: '80%',
    },
    datetext: {
        flexDirection: 'row',
    },
    buttonText: {
        fontSize: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },






});