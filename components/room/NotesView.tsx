import { View, Text, ScrollView, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { notesViewStyle } from '../../styles/NotesViewStyles';
import { NoteData } from '../../domain/RoomType';
import { useState } from 'react';
import { NoteModal } from './NoteModal';
import { Roles } from '../../domain/UserType';
import Icon from 'react-native-vector-icons/Feather';
import { auth } from '../../firebase-config';

export const NotesView = (props: any) => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const handleRequestClose = () => {
        setModalVisible(false);
    }

    const handleDelete = () => {

    }

    return (
        <View style={notesViewStyle.container}>
            <NoteModal room={props.room} isVisible={modalVisible} handleRequestClose={handleRequestClose} />
            <ScrollView contentContainerStyle={notesViewStyle.notes}>
                {props.room?.notes?.map((res: NoteData, index:number) => {                    
                    return(
                        <View key={'note: ' + index} style={[notesViewStyle.card, notesViewStyle.shadow]}>
                            <Text style={{fontWeight:'bold', fontSize:25}}>Note: {new Date(res.date).toDateString()} </Text>
                            <Text style={{paddingBottom:10}}>{res.note}</Text>
                            <View style={{flexDirection:'row', borderTopWidth:1, justifyContent:'space-between'}}>
                                <Text>Created By:</Text>
                                {auth.currentUser?.uid == res.author &&
                                    <TouchableOpacity onPress={() =>{}} style={[notesViewStyle.delete, notesViewStyle.shadow]}>
                                        <Icon style={{alignSelf:'center'}} name='trash-2' color={'white'} size={20}/>
                                    </TouchableOpacity>
                                }
                            </View>
                        </View>
                    )
                })}
            </ScrollView>
            <TouchableOpacity style={notesViewStyle.addBtn} onPress={() => {setModalVisible(true)}}>
                <Text style={notesViewStyle.addText}>Add Note</Text>
            </TouchableOpacity>
        </View>
    );
}

