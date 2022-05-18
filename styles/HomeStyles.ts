import { Platform, StyleSheet } from 'react-native';

export const homeStyle = StyleSheet.create({
    container: {
        flex: 1,
        width: Platform.OS === ('android' || 'ios') ? '100%' : '100%',
        justifyContent: 'center',
        alignContent:'center',
        alignSelf:'center',
        backgroundColor:'#FFFFFF'
    },
    header: {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    searchBar: {
        backgroundColor:'#C1E8FD',
        width: '90%',
        height: 30,
        borderRadius:5,
        shadowColor:'rgba(0, 0, 0, 0.2)',
        shadowOffset:{width:0, height:3},
        shadowOpacity:0.8,
        shadowRadius:2,
        elevation:1,
        paddingLeft:10
    },
    body: {
        alignItems:'center'
    },
    card: {
        width: '90%',
        height: 250,
        flexWrap:'wrap',
        backgroundColor:'#C1E8FD',
        flexDirection:'column',
        shadowColor:'rgba(0, 0, 0, 0.2)',
        borderRadius:5,
        shadowOffset:{width:0, height:3},
        shadowOpacity:0.8,
        shadowRadius:2,
        elevation:6,
        marginBottom:25
    },
    shadow:{
        shadowColor: "#000", 
        shadowOffset: { width: 0,height: 3},
        shadowOpacity: 0.27,
        shadowRadius: 4.65, 
        elevation: 6
    }, 
    visibleModal: { 
        flexDirection: 'row', 
        justifyContent: 'center', 
        backgroundColor: '#C1E8FD' 
    },
    assignPatient: { 
        fontSize: 20, 
        paddingTop: 5 
    },
    bedPatient: { 
        alignSelf: 'center', 
        paddingLeft: 10 
    },
    roomPatient: { 
        flex:9, 
        flexDirection: 'column' 
    },
    patientStatus: {
        flex:1, 
        backgroundColor:['yellow', 'red', 'green'][~~(Math.random()*3)]
    }
});