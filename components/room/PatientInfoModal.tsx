import { Text, View, TextInput, Pressable, Modal, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { getPatient as folkeregisterGetPatient} from '../../api/folkeregisterModelAPI';
import {getPatient as firebaseGetPatient} from '../../api/firebaseAPI';
import { FolkeregisterPerson, Patient } from '../../domain/PatientType';
import { patientInfoStyle } from '../../styles/PatientInfoStyle';
import { PatientInfoModalProps } from '../../domain/patientInfoType';


export const PatientInfoModal = (props: PatientInfoModalProps) => {
    const [patient, setPatient] = useState<FolkeregisterPerson | Patient>();
    const [error, setError] = useState<Error | undefined>(undefined);

    useEffect(() => {
        folkeregisterGetPatient(props.fnr).then(patient => {
            setPatient(patient);
        }).catch((err) =>{setError(err);});

        if(!patient){
            firebaseGetPatient(props.fnr).then(patient => {
                setPatient(patient);
            }).catch((err) =>{setError(err);});
        }
        
    }, []);

    useEffect(() => {
        console.log(patient);
    }, [patient]);

/* 
    if (error) {
        return <View>
            <Text>{error.message}</Text>
            <Text>Can't find patient info</Text>
        </View>
    } */

    return (

        <Modal
            animationType="slide"
            statusBarTranslucent={true}
            transparent={true}
            visible={props.modalVisible}
            onRequestClose={() => props.handleRequestClose()}
            testID="patientInfoModal"
        >
            <View style={{ top: '20%', bottom: '15%' }}>
                <View style={patientInfoStyle.container}>
                    <Text style={{ fontSize: 30, fontWeight: '200', marginTop: 10, marginBottom: 10 }}>Patient</Text>
                    <View style={patientInfoStyle.text}>
                        <Text style={{ fontSize: 15, marginBottom: 10 }}>
                            <Text style={{ fontWeight: 'bold' }}>Lastname: </Text>
                            <Text testID='lastname'>{patient?.lastname}</Text>
                        </Text>
                        <Text style={{ fontSize: 15, marginBottom: 10 }}>
                            <Text style={{ fontWeight: 'bold' }}>Firstname: </Text>
                            <Text testID='firstname'>{patient?.firstname} {patient?.midlename}</Text>
                        </Text>
                        <Text style={{ fontSize: 15, marginBottom: 10 }}>
                            <Text style={{ fontWeight: 'bold' }}>SSN: </Text>
                            <Text testID='ssn'>{patient?.ssn}</Text>
                        </Text>
                        <Text style={{ fontSize: 15, marginBottom: 10 }}>
                            <Text style={{ fontWeight: 'bold' }}>Gender: </Text>
                            <Text testID='gender'>{patient?.gender}</Text>
                        </Text>
                        <Text style={{ fontSize: 15, marginBottom: 10 }}>
                            <Text style={{ fontWeight: 'bold' }}>Address: </Text>
                            <Text  testID='address'>{patient?.address} {patient?.housenumber}</Text>
                        </Text>
                        <Text style={{ fontSize: 15, marginBottom: 10 }}>
                            <Text style={{ fontWeight: 'bold' }}>City: </Text>
                            <Text  testID='city'>{patient?.city}</Text>
                        </Text>
                        <Text style={{ fontSize: 15, marginBottom: 10 }}>
                            <Text style={{ fontWeight: 'bold' }}>Co-Address: </Text>
                            <Text  testID='co.adress'>{patient?.coAddress}</Text>
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

