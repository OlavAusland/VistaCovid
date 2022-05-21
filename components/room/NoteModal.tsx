import { useState } from 'react';
import { Button, Modal, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { addNote } from '../../api/firebaseAPI';
import { NoteData, Room } from '../../domain/RoomType';
import { auth } from '../../firebase-config';
import { noteModalStyle } from '../../styles/NoteModalStyles';

type NoteModalType = {
    isVisible: boolean,
    handleRequestClose: Function,
    room: Room
}

export const NoteModal = (props: NoteModalType) => {

    const [note, setNote] = useState<NoteData>({ author: auth.currentUser ? auth.currentUser.uid : '', note: '', date: Date.now() });
    const handleSubmit = () => {
        setNote({ ...note, date: Date.now() });
        addNote(props.room.id, note);
    }

    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={props.isVisible}
            onRequestClose={() => { props.handleRequestClose() }}
        >
            <View style={noteModalStyle.container}>
                <View style={noteModalStyle.notes}>
                    <View style={{ flex: 1 }}>
                        <TextInput
                            style={{ justifyContent: 'flex-start' }}
                            numberOfLines={10}
                            multiline={true}
                            placeholder="Note"
                            onChangeText={(text: string) => { setNote({ ...note, note: text }) }}
                        />
                    </View>
                    <View>
                        <Button title={'Add'} onPress={() => { handleSubmit(); props.handleRequestClose() }} />
                        <Button title={'Close'} onPress={() => { props.handleRequestClose() }} />
                    </View>
                </View>
            </View>
        </Modal>
    );
}