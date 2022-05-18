
import { Platform, StyleSheet } from 'react-native';

export const roomStyle = StyleSheet.create({
    headerText: {
        fontSize: 40,
        fontWeight: 'bold'
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
        justifyContent:'center',
        alignItems:'center'
        
    },
    notesContainer: {
        width: Platform.OS === ('android' || 'ios') ? '80%' : '100%',
    },
    noteContainer : {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        borderRadius: 5,
        paddingLeft: 5,
        width:'100%',
        marginBottom:10
    },
        container: {
        flex: 1,
        justifyContent: 'center',
        alignSelf:'center', 
        width: Platform.OS === 'android' ? '100%' : '50%',
        backgroundColor:'white'
    },
        header: {
        justifyContent:'center',
        alignItems:'center',
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'white'
    },
    graphButton:{
        flexBasis: '45%', 
        justifyContent: 'center', 
        backgroundColor: '#9DD4FB', 
        height: 60,
        borderRadius:10
    },
   
});
