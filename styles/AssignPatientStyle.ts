import { StyleSheet, Platform } from 'react-native';

export const assignPatientStyle = StyleSheet.create({

    container: {
        alignContent: 'center',
        alignSelf: 'center',
        width: Platform.OS === 'android' ? '100%' : '50%',
        height: '100%',
        backgroundColor: '#9dd4fb',
        paddingLeft: 20,
        paddingRight: 20,
        padding: 20,
        elevation: 5,

    },
    header: {
        fontSize: 40,
        marginBottom: 60
    },
    text: {
        backgroundColor: 'white',
        padding: 10,
    },
    button: {
        backgroundColor: '#0274a1',
        width: 150,
        alignSelf: 'center',
        marginTop: 30,
        height: 40,
        borderRadius: 10,
        marginRight: 20,
    },
    newInputContainer: {
        fontSize: 20,
        paddingBottom: 5
    },
    newpatientinput: {
        height: 40,
        backgroundColor: 'white',
        paddingLeft: 4,
        marginBottom: 8
    },
    newPatientButton: {
        backgroundColor: '#0274a1',
        width: 130,
        height: 30,
        borderRadius: 10,
        marginTop: 5,
        flexDirection: 'row',
    },
    newFooter: {
        flexDirection: 'row',
        alignContent: 'space-between',
        marginTop: 140
    },
    existingPatient: {
        fontSize: 20,
        paddingBottom: 5,
        marginTop: 40
    },
    existingPatientInput: {
        flex: 3,
        height: 40,
        backgroundColor: "white",
        paddingLeft: 10,
        width: "100%"
    },
    existinginputcontainer: {
        width: "100%",
        borderRadius: 5,
        flexDirection: "row",
        marginBottom: 10,
    },
   existingFooter: {
        flexDirection: 'row',
        alignContent: 'space-between',
        marginTop: 180
    },
    existngDisplay: {
        fontSize: 15
    },
    existingsearch: {
        width: 70,
        backgroundColor: "#0274a1",
        height: 40,
        borderRadius: 10,
        marginLeft: 10,
    },
    existingSearchText: {
        color: "white",
        alignSelf: "center", 
        fontSize: 15, 
        marginTop: 10,
    }, 
    roomtext: {
        fontSize: 20,
        paddingBottom: 5,
        marginTop: 25
    },
    responsibleContainer: {
        marginTop: 1
    },
    buttontext: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 20
    },
    dropdownContainer: {
        backgroundColor: 'white'
    },
    addNewPatientButtonText: {
        color: "white",
        alignSelf: "center",
        fontSize: 15,
    },
    plussIcon: {
        margin: 5,
    },


})
