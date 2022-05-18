
import { Platform, StyleSheet } from 'react-native';

export const roomStyle = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        width: Platform.OS === ('android' || 'IOS') ? '100%' : '100%',
        backgroundColor: 'white'
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: 'white'
    },
    headerText: {
        fontSize: 40,
        fontWeight: 'bold'
    },
    graphButton: {
        flexBasis: '45%',
        justifyContent: 'center',
        backgroundColor: '#9DD4FB',
        height: 60,
        borderRadius: 10
    },
    notesButton: {
        flexBasis: '45%',
        justifyContent: 'center',
        backgroundColor: '#9DD4FB',
        height: 60,
        borderRadius: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 10,
        paddingTop: 20,
        width: '100%'
    },
    buttonTextSize: {
        fontSize: 20,
        alignSelf: 'center',
        fontWeight: 'bold'
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 2
    },
    graphContainer: { 
        flexBasis: Platform.OS === 'android' ? '80%' : '80%',
        justifyContent: 'center',
        alignItems: 'center' },
}
);