import { Modal, Pressable, Text, View } from "react-native";
import { adminStyle } from "../../styles/AdminStyles";

type DismissPatientModal={
    modalVisible: boolean;
    handleRequestClose: Function;
    dismissAndClose: Function;
}

export const DismissPatientModal = (props: DismissPatientModal) => {
    
    return(
        <Modal
        animationType="slide"
        statusBarTranslucent={true}
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={()=>props.handleRequestClose()}>

                <View style={adminStyle.centeredView}>
                    <View style={adminStyle.modalView}>
                        <Text style={adminStyle.modalText}>Are you sure you want to dismiss patient?</Text>
                        
                        <Pressable
                        style={[adminStyle.button, adminStyle.buttonOpen]}
                        onPress={()=> props.dismissAndClose()}
                        >
                            <Text style={adminStyle.textStyle}>Yes, dismiss.</Text>
                        </Pressable>

                        <Pressable
                        style={[adminStyle.button, adminStyle.buttonClose]}
                        onPress={()=> props.handleRequestClose()}
                        >
                            <Text style={adminStyle.textStyle}>No, close.</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
    );
}

