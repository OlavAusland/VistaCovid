import { Text, View, Pressable, Modal } from 'react-native';
import { useEffect } from 'react';
import { patientInfoStyle } from '../../styles/PatientInfoStyle';
import { PatientInfoModalProps } from '../../domain/patientInfoType';
import Gender from 'react-native-vector-icons/Ionicons';



export const PatientInfoModal = (props: PatientInfoModalProps) => {
    
    useEffect(() => {
        console.log(props.patient);
    }, [props.patient]);

    return (
        <Modal
            animationType="slide"
            statusBarTranslucent={true}
            transparent={true}
            onRequestClose={() => props.handleRequestClose()}
            testID="patientInfoModal"
        >
            <View style={patientInfoStyle.container}>
                <View style={patientInfoStyle.containerInside}>
                    <Text style={patientInfoStyle.patientText}>Patient</Text>
                    <View style={patientInfoStyle.textContainer}>
                        <Text style={patientInfoStyle.text}>
                            <Text style={patientInfoStyle.explainText}>Lastname: </Text>
                            <Text testID='lastname'>{props.patient?.lastname}</Text>
                        </Text>
                        <Text style={patientInfoStyle.text}>
                            <Text style={patientInfoStyle.explainText}>Firstname: </Text>
                            <Text testID='firstname'>{props.patient?.firstname} {props.patient?.midlename}</Text>
                        </Text>
                        <Text style={patientInfoStyle.text}>
                            <Text style={patientInfoStyle.explainText}>SSN: </Text>
                            <Text testID='ssn'>{props.patient?.ssn}</Text>
                        </Text>
                        <Text style={patientInfoStyle.text}>
                            <Text style={patientInfoStyle.explainText}>Gender: </Text>
                            <Text testID='gender'>{props.patient?.gender}</Text>
                            {(props.patient?.gender === 'female' || props.patient?.gender === 'kvinne') &&
                            <Gender name="female" size={18} color="#0274a1"/> }
                            {(props.patient?.gender === 'male' || props.patient?.gender === 'mann') &&
                            <Gender name="male" size={18} color="#0274a1"/> }
                        </Text>
                        <Text style={patientInfoStyle.text}>
                            <Text style={patientInfoStyle.explainText}>Address: </Text>
                            <Text  testID='address'>{props.patient?.address} {props.patient?.housenumber}</Text>
                        </Text>
                        <Text style={patientInfoStyle.text}>
                            <Text style={patientInfoStyle.explainText}>City: </Text>
                            <Text  testID='city'>{props.patient?.city}</Text>
                        </Text>
                        <Text style={patientInfoStyle.text}>
                            <Text style={patientInfoStyle.explainText}>Co-Address: </Text>
                            <Text  testID='co.address'>{props.patient?.coAddress}</Text>
                        </Text>
                    </View>
                    <Pressable
                        onPress={() => props.handleRequestClose()} >
                        <View style={patientInfoStyle.button}>
                            <Text style={patientInfoStyle.buttonText}>Close</Text>
                        </View>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}
