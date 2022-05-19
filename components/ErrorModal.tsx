import { Modal, View, Text, Pressable } from "react-native";
import { ErrorType } from "../domain/Errortype";
import { erroStyle } from "../styles/ErrorStyle";


type ErrorModalProps = {
    error: ErrorType
    handleRequestClose: Function
   
};

export const Errormodal = (props: ErrorModalProps) => {
    return (
        <Modal
            animationType="slide"
            statusBarTranslucent={true}
            transparent={true}
            visible={props.error.errormodalVisible}
            onRequestClose={() => props.handleRequestClose()}
            testID="patientInfoModal"
        >
            <View style={erroStyle.centeredView}>
                <View style={erroStyle.modalView}>
                    <Text testID="errormessage" style={erroStyle.modalText}>Error: {"\n"}{props.error.errorObject?.message}</Text>
                    
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