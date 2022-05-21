import { Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { existingPatientProps } from "../../domain/AssignPatietTypes";
import { DropDownType } from "../../domain/DropDownType";
import { auth } from "../../firebase-config";
import { assignPatientStyle } from "../../styles/AssignPatientStyle";
import { dropdownStyles } from "../../styles/dropdownStyle";


export const ExistingPatient = (props: existingPatientProps) => {
    return (
        <View>
            <View>
                <Text style={assignPatientStyle.existingPatient}> Patient: </Text>
                <View style={assignPatientStyle.existinginputcontainer}>
                    <TextInput
                        onChangeText={(text) => {props.setSearch(text); }}
                        placeholder="SSN"
                        style={assignPatientStyle.existingPatientInput} />
                    <TouchableOpacity
                        style={{ flex: 1 }}
                        onPress={() => props.handleSearch()}>
                        <View style={assignPatientStyle.existingsearch} >
                            <Text style={assignPatientStyle.existingSearchText}>Search </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {props.patient?.firstname && (
                    <View>
                        <Text style={assignPatientStyle.existngDisplay}>
                            {props.patient.lastname}, {props.patient.firstname}{" "}
                            {props.patient.midlename}
                        </Text>
                    </View>
                )}
                {props.error?.length > 0 && (
                    <View>
                        <Text style={assignPatientStyle.existngDisplay}>No patient Found</Text>
                        <Pressable onPress={() => props.handleNew()}>
                            <View style={assignPatientStyle.newPatientButton}>
                                <FontAwesome5 style={assignPatientStyle.plussIcon} color="white" name="plus" size={20}/>
                                <Text style={assignPatientStyle.addNewPatientButtonText}> New Patient </Text>
                            </View>
                        </Pressable>
                    </View>
                )}
                <Text style={assignPatientStyle.roomtext}> Room:</Text>
                <View style={assignPatientStyle.dropdownContainer}>
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
                        onChange={(item) => {
                            props.setDropdown((prev: DropDownType) => ({
                                ...prev,
                                label: item.value,
                            }));
                        }}
                        renderLeftIcon={() => (
                            <FontAwesome5 style={dropdownStyles.icon} color="black" name="bed" size={20}/>
                        )}
                    />
                </View>
            </View>
            <View style={{ marginTop: 10 }}>
                <Text> Responsible: {auth.currentUser ? auth.currentUser.displayName : 'User not found'}</Text>
            </View>
            <View
                style={assignPatientStyle.existingFooter}>
                <Pressable onPress={() => props.handleAddPatient()}>
                    <View style={assignPatientStyle.button}>
                        <Text style={assignPatientStyle.buttontext}>Add</Text>
                    </View>
                </Pressable>
                <TouchableOpacity onPress={() => props.setEmpty()}>
                    <View style={assignPatientStyle.button}>
                        <Text style={assignPatientStyle.buttontext}>Cancel</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};
