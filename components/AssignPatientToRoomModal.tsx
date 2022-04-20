import { Text, View, TextInput, Pressable, Modal, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getPatient } from '../api/folkeregisterModelAPI';
import { FolkeregisterPatient } from '../domain/PatientType';
import { assignPatientStyle } from '../styles/AssignPatientStyle';



type AssignPatientModalProps = {
    modalVisible: boolean;
    handleRequestClose: Function;
}


export const AssignPatientModal = (props: AssignPatientModalProps) => {
    const [patient, setPatient] = useState<FolkeregisterPatient>();
    const [search, setSearch] = useState<string>("");

    const handleSearch = () => {
        if (search.length > 0) {
            const fnrRegex = new RegExp(/^(0[1-9]|[1-2][0-9]|31(?!(?:0[2469]|11))|30(?!02))(0[1-9]|1[0-2])\d{7}$/g);
            const isFnr = fnrRegex.test(search);

            if (isFnr) {
                getPatient(search).then(result => {
                    setPatient(result)
                }).catch(err => { console.log(err) });
            }
        }
    }
    return (

        <Modal
            animationType="slide"
            statusBarTranslucent={true}
            transparent={true}
            visible={props.modalVisible}
            onRequestClose={() => props.handleRequestClose()}
        >
            <View style={{ top: '5%', }}>
                <View style={assignPatientStyle.container}>
                    <View style={{ width: '100%', borderRadius: 5, flexDirection: 'row', marginBottom: 10 }}>
                        <TextInput onChangeText={text => { setSearch(text) }} placeholder="SSN" style={{ flex: 3, height: 40, backgroundColor: "white", paddingLeft: 10, width: '100%' }} />
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => handleSearch()}>
                            <View style={{ width: 70, backgroundColor: '#0274a1', height: 40, borderRadius: 10, marginLeft: 10 }}>
                                <Text style={{ color: 'white', alignSelf: 'center', fontSize: 15, marginTop: 10 }}>Search</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {patient &&
                        <View>
                            <Text style={{ fontSize: 20 }}>
                                <Text style={{ fontWeight: 'bold' }}>Patient: </Text>
                                <Text>{patient.lastname}, {patient.firstname} {patient.midlename}</Text>
                            </Text>
                        </View>}
                    <View style={{ flexDirection: 'row', alignContent: 'space-between' }}>
                        <Pressable onPress={() => props.handleRequestClose()} >
                            <View style={assignPatientStyle.button}>
                                <Text style={{ color: 'white', alignSelf: 'center', fontSize: 20 }}>Add</Text>
                            </View>
                        </Pressable>
                        <TouchableOpacity
                            onPress={() => props.handleRequestClose()} >
                            <View style={assignPatientStyle.button}>
                                <Text style={{ color: 'white', alignSelf: 'center', fontSize: 20 }}>Cancel</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

