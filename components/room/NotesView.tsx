import { View, Text, ScrollView } from 'react-native';
import { roomStyle } from '../../styles/RoomStyles';
import { NoteData } from '../../types/RoomType';

export const NotesView = (props: any) => {
    return (
        <ScrollView contentContainerStyle={roomStyle.body}>
            {props.room?.notes?.map((res: NoteData, index:number) => {
                return(
                    <View key={'note: ' + index} style={roomStyle.noteContainer}>
                        <Text style={{fontWeight:'bold', fontSize:25, textDecorationLine:'underline'}}>Role: {res.role}</Text>
                        <Text>{res.role}: {res.note}</Text>
                    </View>
                )
            })}
        </ScrollView>
    );
}