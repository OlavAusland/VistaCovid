import { Text, View, TextInput, Pressable, Modal } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getPatient } from '../api/folkeregisterModelAPI';
import { FolkeregisterPatient } from '../domain/PatientType';
import { patientInfoStyle } from '../styles/PatientInfoStyle';


type PatientInfoModalProps = {
    modalVisible: boolean;
    handleRequestClose: Function;
}


export const PatientInfoModal = (props: PatientInfoModalProps) => {
    const [patient, setPatient] = useState<FolkeregisterPatient>();

    useEffect(() => {
        getPatient("10054023687").then(patient => {
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
            <View style={patientInfoStyle.container}>
                <Text style={{fontSize: 30, fontWeight: '200', marginTop:10, marginBottom: 10}}>Patient</Text>
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
        </Modal>
    );
}
