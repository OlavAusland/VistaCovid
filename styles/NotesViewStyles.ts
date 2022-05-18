import { StyleSheet, Platform } from "react-native"

export const notesViewStyle = StyleSheet.create({
    container:{
        flex:1
    },
    notes:{
        alignItems:'center'
    },
    card: {
        width:'95%',
        backgroundColor:'#C1E8FD',
        minHeight:100,
        height:'auto',
        borderRadius:10,
        padding:10,
        marginTop:25
    },
    shadow:{
        shadowColor: "#000", 
        shadowOffset: { width: 0,height: 3,},
        shadowOpacity: 0.27,
        shadowRadius: 4.65, 
        elevation: 2
    },
    delete: {
        backgroundColor:'red',
        borderRadius:10,
        padding:10,
        alignSelf:'flex-end'
    },
    addBtn:{
        justifyContent:'center',
        alignItems:'center',
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#0274A1'
    },
    addText:{
        color:'white',
        fontSize:20
    }
})