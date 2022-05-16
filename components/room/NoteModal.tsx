import { Modal, View, Text, Button} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

type NoteModalType = {
    isVisible: boolean,
    handleRequestClose: Function
}

export const NoteModal = (props: NoteModalType) => {
    return(
        <Modal
            transparent={true}
            animationType="slide"
            visible={props.isVisible}
            onRequestClose={() => {props.handleRequestClose()}}
        >
            <View style={{ alignSelf:'center', width:'90%', height:300, backgroundColor:'white'}}>
                <View style={{flex:1}}>
                    <TextInput
                        style={{justifyContent:'flex-start'}}
                        numberOfLines={10}
                        multiline={true}
                        placeholder="Note"
                    />
                </View>
                <View>
                    <Button title={'Close'} onPress={() => {props.handleRequestClose()}}/>
                </View>
            </View>
        </Modal>
    );
}