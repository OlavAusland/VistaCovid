import { Text, View, TextInput, Pressable, Modal } from 'react-native';
import { useEffect, useState } from 'react';
import { getPatient } from '../api/folkeregisterModelAPI';
import { FolkeregisterPatient } from '../domain/PatientType';


type PatientInfoModalProps = {
    modalVisible: boolean;
    handleRequestClose: Function;
}


export const PatientInfoModal = (props: PatientInfoModalProps) => {
    const [patient, setPatient] = useState<FolkeregisterPatient>();

    useEffect(() => {
        getPatient("01038921387").then(patient => {
            setPatient(patient);
        }).catch(err => {console.log(err)});
    }, []);

    return (

        <Modal
            animationType="slide"
            statusBarTranslucent={true}
            transparent={true}
            visible={props.modalVisible}
            onRequestClose={() => props.handleRequestClose()}
        >
            <View style={{ flex: 1, backgroundColor: 'blue' }}>
                <View style={{ flex: 1, backgroundColor: 'white', padding: 20 }}>
                    <Text>
                        <Text style={{ fontWeight: 'bold' }}>Lastname: </Text>
                        <Text>{patient?.lastname}</Text>
                    </Text>
                    <Text>
                        <Text style={{ fontWeight: 'bold' }}>Firstname: </Text>
                        <Text>{patient?.firstname} {patient?.midlename}</Text>
                    </Text>
                    <Text>
                        <Text style={{ fontWeight: 'bold' }}>SSN: </Text>
                        <Text>{patient?.ssn}</Text>
                    </Text>
                    <Text>
                        <Text style={{ fontWeight: 'bold' }}>Gender: </Text>
                        <Text>{patient?.gender}</Text>
                    </Text>
                    <Text>
                        <Text style={{ fontWeight: 'bold' }}>Address: </Text>
                        <Text>{patient?.address} {patient?.housenumber}</Text>
                    </Text>
                    <Text>
                        <Text style={{ fontWeight: 'bold' }}>City: </Text>
                        <Text>{patient?.city}</Text>
                    </Text>
                    <Text>
                        <Text style={{ fontWeight: 'bold' }}>Co-Address: </Text>
                        <Text>{patient?.coAddress}</Text>
                    </Text>
                </View>
            </View>
        </Modal>
    );
}