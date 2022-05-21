import { StyleSheet } from 'react-native';

export const manageUsersStyles = StyleSheet.create({
    header:{
        backgroundColor:'white',
        paddingTop:40,
        paddingBottom:10
    },
    delete: {
        backgroundColor:'red', 
        flexBasis:'15%', 
        height:100, 
        justifyContent:'center', 
        alignItems:'center', 
        shadowColor: "#000", 
        shadowOffset: { width: 0,height: 3},
        shadowOpacity: 0.27,
        shadowRadius: 4.65, 
        elevation: 6,
        borderTopRightRadius:10,
        borderBottomRightRadius:10
    },
    cardContainer:{
        width:'90%',
        marginTop:25,
        flexDirection:'row', 
        justifyContent:'space-between', 
        alignItems:'center', 
    },
    shadow:{
        shadowColor: "#000", 
        shadowOffset: { width: 0,height: 3,},
        shadowOpacity: 0.27,
        shadowRadius: 4.65, 
        elevation: 6
    },
    card: {
        flexDirection:'row', 
        backgroundColor:'#9DD4FB', 
        flexBasis:'90%', 
        height:100, 
        justifyContent:'center', 
        shadowColor: "#000", 
        shadowOffset: { width: 0,height: 3,},
        shadowOpacity: 0.27,
        shadowRadius: 4.65, 
        elevation: 6,
        borderTopLeftRadius:10,
        borderBottomLeftRadius:10
    },
    add:{
        marginTop:25,
        backgroundColor:'white',
        width:'90%',
        height:75,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10
    },
    search:{
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderRadius:10,
        padding: 10,
    }
})