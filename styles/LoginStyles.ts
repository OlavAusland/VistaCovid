import { StyleSheet } from "react-native";

export const loginStyle = StyleSheet.create({

    input: {
        height: 40,
        paddingLeft: 5,
        width: '75%',
        fontSize: 18,
    },
    loginButtons: {
        backgroundColor: "#0274a1",
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        width: '80%'
    },
    buttontext:{
        fontSize: 20,
        color: '#FFFFFF'
    },
    container:{ 
        width: '100%', 
        justifyContent: 'center',
        alignItems: 'center', 
        flex: 1, 
        backgroundColor: '#FFFFFF' 
    }, 
    logo: { 
        height: 270, 
        width: 270 
    },
    inputBar: { 
        width: '85%', 
        borderRadius: 8, 
        backgroundColor: '#9dd4fb', 
        flexDirection: 'row', 
        marginBottom: 8 
    },
    icons: { 
        height: '85%', 
        marginLeft: 10, 
        marginTop: 3, 
        marginRight: 2 
    },
    eyeIcon: { 
        height: '100%', 
        alignSelf: 'center', 
        paddingRight: 20, 
        paddingTop: 6 
    }, 
    topLine: {
        marginBottom: 60
    }, 
    bottomLine: {
        width: '100%', 
        justifyContent: 'center', 
        alignItems: 'center', 
        flexDirection: 'row'
    },
    loginLogo: { 
        width: '85%', 
        justifyContent: 'center',
        alignItems: 'center', 
        flexDirection: 'row', 
        backgroundColor:'#0274a1', 
        borderRadius: 8}
});