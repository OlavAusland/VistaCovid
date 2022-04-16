import { Text, View, TextInput, Pressable, Modal, ScrollView } from 'react-native';
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
            console.log(search);
            console.log(isFnr);
            if (isFnr) {
                getPatient(search).then(patient => {
                    setPatient(patient)
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
                    <View style={{ width: '75%', borderRadius: 5, backgroundColor: '#FFFFFF', flexDirection: 'row', marginBottom: 10 }}>
                        <TextInput onChangeText={text => {setSearch(text)}} placeholder="SSN" style={{ height: 40, paddingLeft: 10, width: '100%' }} />
                        <Pressable onPress={handleSearch}>
                            <View style={{ width: 70, backgroundColor: '#0274a1', height: 40, borderRadius: 10, marginLeft: 10 }}>
                                <Text style={{ color: 'white', alignSelf: 'center', fontSize: 15, marginTop: 10 }}>Search</Text>
                            </View>
                        </Pressable>
                    </View>
                    <View style={{ flexDirection: 'row', alignContent: 'space-between' }}>
                        <Pressable onPress={() => props.handleRequestClose()} >
                            <View style={assignPatientStyle.button}>
                                <Text style={{ color: 'white', alignSelf: 'center', fontSize: 20 }}>Add</Text>
                            </View>
                        </Pressable>
                        <Pressable
                            onPress={() => props.handleRequestClose()} >
                            <View style={assignPatientStyle.button}>
                                <Text style={{ color: 'white', alignSelf: 'center', fontSize: 20 }}>Cancel</Text>
                            </View>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

