import { Platform, StyleSheet } from 'react-native';

export const patientInfoStyle = StyleSheet.create({
    container: {
        top: '20%',
        bottom: '15%' 
    },
    containerInside: {
        alignContent: 'flex-end',
        alignSelf: 'flex-end',
        width: Platform.OS === 'android' ? '100%' : '50%',
        backgroundColor: '#9dd4fb',
        paddingLeft: 20,
        paddingRight: 20,
        padding: 20,
        elevation: 5,

    },
    textContainer: {
        backgroundColor: 'white',
        padding: 10,
    },
    text: {
        fontSize: 15,
        marginBottom: 10
    },
    explainText: {
        fontWeight: 'bold'
    },
    button: {
        justifyContent: 'center',
        backgroundColor: '#0274a1',
        width: Platform.OS === 'android' ? '50%' : '25%',
        alignSelf: 'center',
        marginTop: 30,
        height: 40,
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 20
    },
    patientText: {
        fontSize: 30,
        fontWeight: '200',
        marginTop: 10, 
        marginBottom: 10
    },
})
