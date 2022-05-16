import { View, Text, ScrollView, Button } from 'react-native';
import { roomStyle } from '../../styles/RoomStyles';
import { NoteData } from '../../domain/RoomType';
import React, { useState } from 'react';
import { NoteModal } from './NoteModal';

export const NotesView = (props: any) => {
    const [modalVisible, setModalVisible] = useState<boolean>(true);
    const handleRequestClose = () => {
        setModalVisible(false);
    }

    return (
        <View style={{flex:1, backgroundColor:'grey'}}>
            <NoteModal isVisible={modalVisible} handleRequestClose={handleRequestClose} />
            <ScrollView contentContainerStyle={[roomStyle.body, {flex:1}]}>
                {props.room?.notes?.map((res: NoteData, index:number) => {
                    return(
                        <View key={'note: ' + index} style={roomStyle.noteContainer}>
                            <Text style={{fontWeight:'bold', fontSize:25, textDecorationLine:'underline'}}>Role: {res.role}</Text>
                            <Text>{res.role}: {res.note}</Text>
                        </View>
                    )
                })}
            </ScrollView>
            <View>
                <Button title='Add Note' onPress={() => {setModalVisible(true);}}/>
            </View>
        </View>
    );
}