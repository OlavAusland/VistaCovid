import { Text, View, TextInput, Pressable, Modal, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getPatient } from '../api/folkeregisterModelAPI';
import { FolkeregisterPerson } from '../domain/PatientType';
import { patientInfoStyle } from '../styles/PatientInfoStyle';


type PatientInfoModalProps = {
    modalVisible: boolean;
    handleRequestClose: Function;
    fnr: string;
}


export const PatientInfoModal = (props: PatientInfoModalProps) => {
    const [patient, setPatient] = useState<FolkeregisterPerson>();

    useEffect(() => {
        getPatient(props.fnr).then(patient => {
            setPatient(patient);
        }).catch(err => { console.log(err) });
    }, []);

    return (

        <Modal
            animationType="slide"
            statusBarTranslucent={true}
            transparent={true}
            visible={props.modalVisible}
            onRequestClose={() => props.handleRequestClose()}
        >
            <View style={{ top: '20%', bottom: '15%' }}>
                <View style={patientInfoStyle.container}>
                    <Text style={{ fontSize: 30, fontWeight: '200', marginTop: 10, marginBottom: 10 }}>Patient</Text>
                    <View style={patientInfoStyle.text}>
                        <Text style={{ fontSize: 15, marginBottom: 10 }}>
                            <Text style={{ fontWeight: 'bold' }}>Lastname: </Text>
                            <Text>{patient?.lastname}</Text>
                        </Text>
                        <Text style={{ fontSize: 15, marginBottom: 10 }}>
                            <Text style={{ fontWeight: 'bold' }}>Firstname: </Text>
                            <Text>{patient?.firstname} {patient?.midlename}</Text>
                        </Text>
                        <Text style={{ fontSize: 15, marginBottom: 10 }}>
                            <Text style={{ fontWeight: 'bold' }}>SSN: </Text>
                            <Text>{patient?.ssn}</Text>
                        </Text>
                        <Text style={{ fontSize: 15, marginBottom: 10 }}>
                            <Text style={{ fontWeight: 'bold' }}>Gender: </Text>
                            <Text>{patient?.gender}</Text>
                        </Text>
                        <Text style={{ fontSize: 15, marginBottom: 10 }}>
                            <Text style={{ fontWeight: 'bold' }}>Address: </Text>
                            <Text>{patient?.address} {patient?.housenumber}</Text>
                        </Text>
                        <Text style={{ fontSize: 15, marginBottom: 10 }}>
                            <Text style={{ fontWeight: 'bold' }}>City: </Text>
                            <Text>{patient?.city}</Text>
                        </Text>
                        <Text style={{ fontSize: 15, marginBottom: 10 }}>
                            <Text style={{ fontWeight: 'bold' }}>Co-Address: </Text>
                            <Text>{patient?.coAddress}</Text>
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

