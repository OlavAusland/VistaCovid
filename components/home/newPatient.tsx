import { Text, View, TextInput, Pressable, Modal, TouchableOpacity } from 'react-native';
import { FolkeregisterPerson } from '../../domain/PatientType';
import { assignPatientStyle } from '../../styles/AssignPatientStyle';
import { dropdownStyles } from '../../styles/dropdownStyle';
import { Dropdown } from 'react-native-element-dropdown';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { DropDownType } from '../../domain/DropDownType';
import { newPatientProps } from '../../domain/AssignPatietTypes';
import { auth } from '../../firebase-config';



export const NewPatient = (props: newPatientProps) => {
    return (
        <View>
            <View>
                <Text style={{ fontSize: 20, paddingBottom: 5 }}>Patient:</Text>
                    <TextInput onChangeText={text => props.setPatient((prev:FolkeregisterPerson) => ({...prev, ssn:text}))} placeholder="SSN" style={assignPatientStyle.newpatientinput}/>
                    <TextInput onChangeText={text => props.setPatient((prev:FolkeregisterPerson) => ({...prev, firstname:text}))} placeholder="Firstname" style={assignPatientStyle.newpatientinput}/>
                    <TextInput onChangeText={text => props.setPatient((prev:FolkeregisterPerson) => ({...prev, lastname:text}))} placeholder="Lastname" style={assignPatientStyle.newpatientinput}/>
                    <TextInput onChangeText={text => props.setPatient((prev:FolkeregisterPerson) => ({...prev, gender:text}))} placeholder="sex" style={assignPatientStyle.newpatientinput}/>
                    
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
                        <Text>Responsible: {auth.currentUser?.displayName}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignContent: 'space-between', marginTop: 140 }}>
                        <Pressable onPress={() => props.handleNewPatient()} >
                            <View style={assignPatientStyle.button}>
                                <Text style={{ color: 'white', alignSelf: 'center', fontSize: 20 }}>Add</Text>
                            </View>
                        </Pressable>
                        <TouchableOpacity
                            onPress={() => {props.setNew(false); props.setError(''); props.setPatient(undefined) }} >
                            <View style={assignPatientStyle.button}>
                                <Text style={{ color: 'white', alignSelf: 'center', fontSize: 20 }}>Cancel</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
        </View>
    )


}