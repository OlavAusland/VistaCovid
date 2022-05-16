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
            <View style={{ top: '20%', bottom: '15%' }}>
                <View style={patientInfoStyle.container}>
                    <Text style={{ fontSize: 30, fontWeight: '200', marginTop: 10, marginBottom: 10 }}>Patient</Text>
                    <View style={patientInfoStyle.text}>
                        <Text style={{ fontSize: 15, marginBottom: 10 }}>
                            <Text style={{ fontWeight: 'bold' }}>Lastname: </Text>
                            <Text testID='lastname'>{props.patient?.lastname}</Text>
                        </Text>
                        <Text style={{ fontSize: 15, marginBottom: 10 }}>
                            <Text style={{ fontWeight: 'bold' }}>Firstname: </Text>
                            <Text testID='firstname'>{props.patient?.firstname} {props.patient?.midlename}</Text>
                        </Text>
                        <Text style={{ fontSize: 15, marginBottom: 10 }}>
                            <Text style={{ fontWeight: 'bold' }}>SSN: </Text>
                            <Text testID='ssn'>{props.patient?.ssn}</Text>
                        </Text>
                        <Text style={{ fontSize: 15, marginBottom: 10 }}>
                            <Text style={{ fontWeight: 'bold' }}>Gender: </Text>
                            <Text testID='gender'>{props.patient?.gender}</Text>
                            {(props.patient?.gender === 'female' || props.patient?.gender === 'kvinne') &&
                            <Gender name="female" size={18} color="#0274a1"/> }
                            {(props.patient?.gender === 'male' || props.patient?.gender === 'mann') &&
                            <Gender name="male" size={18} color="#0274a1"/> }
                        </Text>
                        <Text style={{ fontSize: 15, marginBottom: 10 }}>
                            <Text style={{ fontWeight: 'bold' }}>Address: </Text>
                            <Text  testID='address'>{props.patient?.address} {props.patient?.housenumber}</Text>
                        </Text>
                        <Text style={{ fontSize: 15, marginBottom: 10 }}>
                            <Text style={{ fontWeight: 'bold' }}>City: </Text>
                            <Text  testID='city'>{props.patient?.city}</Text>
                        </Text>
                        <Text style={{ fontSize: 15, marginBottom: 10 }}>
                            <Text style={{ fontWeight: 'bold' }}>Co-Address: </Text>
                            <Text  testID='co.address'>{props.patient?.coAddress}</Text>
                        </Text>
                    </View>
                    <Pressable
                        onPress={() => props.handleRequestClose()} >
                        <View style={patientInfoStyle.button}>
                            <Text style={{ color: 'white', alignSelf: 'center', fontSize: 20 }}>Close</Text>
                        </View>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}
