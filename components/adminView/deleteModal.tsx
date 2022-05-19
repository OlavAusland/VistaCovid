import { Modal, Pressable, Text, View } from "react-native";
import { adminStyle } from "../../styles/AdminStyles";

type DeleteRoomModal={
    modalVisible: boolean;
    handleRequestClose: Function;
    deleteRoomAndClose: Function;
}

export const DeleteRoomModal = (props: DeleteRoomModal) => {
    
    return(
        <Modal
        animationType="slide"
        statusBarTranslucent={true}
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={()=>props.handleRequestClose()}>

                <View style={adminStyle.centeredView}>
                    <View style={adminStyle.modalView}>
                        <Text style={adminStyle.modalText}>Are you sure you want to delete this room?</Text>
                        
                        <Pressable
                        style={[adminStyle.buttonClose, adminStyle.buttonClose]}
                        onPress={()=> props.deleteRoomAndClose()}
                        >
                            <Text style={adminStyle.textStyle}>Yes, delete room</Text>
                        </Pressable>

                        <Pressable
                        style={[adminStyle.buttonClose, adminStyle.buttonClose]}
                        onPress={()=> props.handleRequestClose()}
                        >
                            <Text style={adminStyle.textStyle}>No, close modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
    );
}

