import { StyleSheet, Platform } from 'react-native';

export const roomStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignSelf:'center', 
        width: Platform.OS === 'android' ? '100%' : '50%',
        backgroundColor:'rgba(0, 0, 0, 0)'
    },
    header: {
        justifyContent:'center',
        alignItems:'center',
        shadowColor: '#000000',
        marginTop:5,
        paddingTop:10,
        paddingBottom:10
    },
    headerText: {
        fontSize:40,
        fontWeight:'bold'
    },
    body: {
        flexDirection:'row',
        justifyContent:'center',
        flexWrap:'wrap',
        backgroundColor:'rgba(0, 0, 0, 0)'
    },
    //Change flexBasis On Web To Be 40%
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
    }
})