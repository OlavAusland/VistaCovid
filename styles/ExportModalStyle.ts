import { Platform, StyleSheet } from "react-native";

export const exportStyles = StyleSheet.create({
    bodyScrollcontent: {
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center',
        paddingLeft: 10,
        paddingTop: 10
    },
    bodyScrollText: {
        fontSize: 25,
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6
    },
    header: { 
        flex: 2, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#9DD4FB' 
    },
    footer:{
        flex:1, 
        backgroundColor:'#9DD4FB', 
        paddingTop:5
    },
    dateButton:{
        flexBasis:'45%', 
        justifyContent:'center', 
        alignItems:'center', 
        backgroundColor:'#0274a1', 
        paddingTop:10, 
        paddingBottom:10, 
        borderRadius:10
    },
    exportButton:{
        backgroundColor:'#0274a1', 
        width:'95%', 
        alignItems:'center', 
        justifyContent:'center', 
        paddingTop:10, 
        paddingBottom:10, 
        borderRadius:10
    }
});