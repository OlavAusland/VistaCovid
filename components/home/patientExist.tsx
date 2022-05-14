import { Text, View, TextInput, Pressable, Modal, TouchableOpacity } from 'react-native';
import { dropdownStyles } from '../../styles/dropdownStyle';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {FolkeregisterPerson} from '../../domain/PatientType';
import {Dropdown} from 'react-native-element-dropdown';
import { DropDownType } from '../../domain/DropDownType';
import { assignPatientStyle } from '../../styles/AssignPatientStyle';
import { existingPatientProps } from '../../domain/AssignPatietTypes';



export const ExistingPatient = (props: existingPatientProps) => {
    return (
        <View>
            <View>
                <Text style={{ fontSize: 20, paddingBottom: 5, marginTop: 40 }}>Patient:</Text>
                <View style={{ width: '100%', borderRadius: 5, flexDirection: 'row', marginBottom: 10 }}>
                    <TextInput onChangeText={text => { props.setSearch(text) }} placeholder="SSN" style={{ flex: 3, height: 40, backgroundColor: "white", paddingLeft: 10, width: '100%' }} />
                    <TouchableOpacity style={{ flex: 1 }} onPress={() => props.handleSearch()}>
                        <View style={{ width: 70, backgroundColor: '#0274a1', height: 40, borderRadius: 10, marginLeft: 10 }}>
                        
                            <Text style={{ color: 'white', alignSelf: 'center', fontSize: 15, marginTop: 10 }}>Search</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {(props.patient?.firstname) &&
                    <View>
                        <Text style={{ fontSize: 15 }}>{props.patient.lastname}, {props.patient.firstname} {props.patient.midlename}</Text>
                    </View>}
                {(props.error?.length > 0) &&
                        <View >
                            <Text style={{ fontSize: 15 }}>No patient Found</Text>
                            <Pressable onPress={() => props.handleNew()} >
                                <View style={assignPatientStyle.newPatientButton}>
                                    <FontAwesome5 style={{margin:5}} color="white" name="plus" size={20} />
                                    <Text style={{ color: 'white', alignSelf: 'center', fontSize: 15 }}>New Patient</Text>
                                </View>
                            </Pressable>
                        </View>} 
                <Text style={{ fontSize: 20, paddingBottom: 5, marginTop: 25 }}>Room:</Text>
                <View style={{ backgroundColor: 'white' }}>
                    <Dropdown
                        style={dropdownStyles.dropdown}
                        placeholderStyle={dropdownStyles.placeholderStyle}
                        selectedTextStyle={dropdownStyles.selectedTextStyle}
                        inputSearchStyle={dropdownStyles.inputSearchStyle}
                        iconStyle={dropdownStyles.iconStyle}
                        data={props.dropdown.items}
                        search
                        maxHeight={200}
                        labelField="label"
                        valueField="value"
                        placeholder="Select room"
                        searchPlaceholder="Search..."
                        value={props.dropdown.label}
                        onChange={item => {
                            props.setDropdown((prev: DropDownType)=> ({ ...prev, label: item.value }));
                        }}
                        renderLeftIcon={() => (
                            <FontAwesome5 style={dropdownStyles.icon} color="black" name="bed" size={20} />
                        )}
                    />
                </View>
            </View>
            <View style={{ marginTop: 10 }}>
                        <Text>Responsible: {/* {props?.user.lastName}, {props?.user.firstName} */}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignContent: 'space-between', marginTop: 180 }}>
                        <Pressable onPress={() => props.handleAddPatient()} >
                            <View style={assignPatientStyle.button}>
                                <Text style={{ color: 'white', alignSelf: 'center', fontSize: 20 }}>Add</Text>
                            </View>
                        </Pressable>
                        <TouchableOpacity
                            onPress={() => props.setEmpty()} >
                            <View style={assignPatientStyle.button}>
                                <Text style={{ color: 'white', alignSelf: 'center', fontSize: 20 }}>Cancel</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
        </View>
    )


}