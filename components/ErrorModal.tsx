import { Modal, View, Text, Pressable } from "react-native";
import { erroStyle } from "../styles/ErrorStyle";


type ErrorModalProps = {
    errormessage: Error | undefined,
    handleRequestClose: Function
    errorModalVisible: boolean
};

export const Errormodal = (props: ErrorModalProps) => {
    return (
        <Modal
            animationType="slide"
            statusBarTranslucent={true}
            transparent={true}
            visible={props.errorModalVisible}
            onRequestClose={() => props.handleRequestClose()}
            testID="patientInfoModal"
        >
            <View style={erroStyle.centeredView}>
                <View style={erroStyle.modalView}>
                    <Text style={erroStyle.modalText}>Error: {props.errormessage?.message}</Text>
                    <View style={{flex:1}}>
                        <Pressable
                            style={[erroStyle.button, erroStyle.buttonClose]}
                            onPress={() => props.handleRequestClose()} >
                            <Text style={erroStyle.textStyle}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </View>

        </Modal>
    );
}