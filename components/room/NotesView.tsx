import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { NoteData } from '../../domain/RoomType';
import { auth } from '../../firebase-config';
import { NoteModal } from './NoteModal';

export const NotesView = (props: any) => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const handleRequestClose = () => {
        setModalVisible(false);
    }

    const handleDelete = () => {

    }

    return (
        <View style={styles.container}>
            <NoteModal room={props.room} isVisible={modalVisible} handleRequestClose={handleRequestClose} />
            <ScrollView contentContainerStyle={styles.notes}>
                {props.room?.notes?.map((res: NoteData, index:number) => {                    
                    return(
                        <View key={'note: ' + index} style={[styles.card, styles.shadow]}>
                            <Text style={{fontWeight:'bold', fontSize:25}}>Note: {new Date(res.date).toDateString()} </Text>
                            <Text style={{paddingBottom:10}}>{res.note}</Text>
                            <View style={{flexDirection:'row', borderTopWidth:1, justifyContent:'space-between'}}>
                                <Text>Created By:</Text>
                                {auth.currentUser?.uid == res.author &&
                                    <TouchableOpacity onPress={() =>{}} style={[styles.delete, styles.shadow]}>
                                        <Icon style={{alignSelf:'center'}} name='trash-2' color={'white'} size={20}/>
                                    </TouchableOpacity>
                                }
                            </View>
                        </View>
                    )
                })}
            </ScrollView>
            <TouchableOpacity style={styles.addBtn} onPress={() => {setModalVisible(true)}}>
                <Text style={styles.addText}>Add Note</Text>
            </TouchableOpacity>
        </View>
    );
}

export const styles = StyleSheet.create({
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