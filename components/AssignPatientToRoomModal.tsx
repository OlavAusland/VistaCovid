import { Text, View, TextInput, Pressable, Modal, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getPatient } from '../api/folkeregisterModelAPI';
import { FolkeregisterPerson } from '../domain/PatientType';
import { assignPatientStyle } from '../styles/AssignPatientStyle';
import { dropdownStyles } from '../styles/dropdownStyle';
import { getAvailableRooms } from '../api/firebaseAPI';
import { Room } from '../domain/RoomType';
import { Dropdown } from 'react-native-element-dropdown';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {addPatientToRoom} from '../api/firebaseAPI';



type AssignPatientModalProps = {
    modalVisible: boolean;
    handleRequestClose: Function;
}

type DropDownType = {
    open: boolean,
    value: string,
    items: Array<ItemType>
    room: string
}

type ItemType = {
    label: string,
    value: string
}

export const AssignPatientModal = (props: AssignPatientModalProps) => {

    const [patient, setPatient] = useState<FolkeregisterPerson>();
    const [search, setSearch] = useState<string>("");
    const [dropdown, setDropdown] = useState<DropDownType>({ open: false, value: "0", items: [], room: "" });

    const handleSearch = () => {
        if (search.length > 0) {
            const fnrRegex = new RegExp(/^(0[1-9]|[1-2][0-9]|31(?!(?:0[2469]|11))|30(?!02))(0[1-9]|1[0-2])\d{7}$/g);
            const isFnr = fnrRegex.test(search);

            if (isFnr) {
                getPatient(search).then(result => {
                    setPatient(result)
                }).catch(err => { console.log('here',err.message) });
            }
        }
    }

    const handleAddPatient = () => {
        if (patient && dropdown.room) {
            addPatientToRoom(dropdown.room, patient.ssn);
            props.handleRequestClose();
            setPatient(undefined);
            setSearch("");
            setDropdown({ open: false, value: "0", items: [], room: "" });
        }
    }


    useEffect(() => {
        console.log('here')
        getAvailableRooms().then((room: Room[]) => {
            setDropdown(prev => ({ ...prev, items: [] }));
            room.forEach((room: Room) => {
                const item: ItemType = { label: room.roomNumber, value: room.id, };
                setDropdown(prev => ({ ...prev, items: [...prev.items, item] }));
            })
        })
    }, [props.modalVisible]);

   

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
                    <Text style={{ fontSize: 40, marginBottom: 90 }}>Admit patient</Text>
                    <Text style={{ fontSize: 20, paddingBottom: 5, marginTop: 40 }}>Patient:</Text>
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
                            <Text style={{ fontSize: 15 }}>{patient.lastname}, {patient.firstname} {patient.midlename}</Text>
                        </View>}
                    <Text style={{ fontSize: 20, paddingBottom: 5, marginTop: 25 }}>Room:</Text>
                    <View style={{ backgroundColor: 'white' }}>
                        <Dropdown
                            style={dropdownStyles.dropdown}
                            placeholderStyle={dropdownStyles.placeholderStyle}
                            selectedTextStyle={dropdownStyles.selectedTextStyle}
                            inputSearchStyle={dropdownStyles.inputSearchStyle}
                            iconStyle={dropdownStyles.iconStyle}
                            data={dropdown.items}
                            search
                            maxHeight={200}
                            labelField="label"
                            valueField="value"
                            placeholder="Select room"
                            searchPlaceholder="Search..."
                            value={dropdown.room}
                            onChange={item => {
                                setDropdown(prev => ({ ...prev, room: item.value }));
                            }}
                            renderLeftIcon={() => (
                                <FontAwesome5 style={dropdownStyles.icon} color="black" name="bed" size={20} />
                            )}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', alignContent: 'space-between', marginTop: 200 }}>
                        <Pressable onPress={() => handleAddPatient()} >
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

