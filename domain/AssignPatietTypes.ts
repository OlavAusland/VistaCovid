import { DropDownType } from "./DropDownType";
import { Patient } from "./PatientType";
import { currentUser } from "./UserType";


export type newPatientProps = {
    setPatient: Function;
    patient:  Patient | undefined;
    setSearch: Function;
    handleSearch: Function;
    dropdown: DropDownType;
    setDropdown: Function;
    handleRequestClose: Function;
    handleNewPatient: Function;
    setNew: Function;
    setError: Function;
}


export type existingPatientProps = {
    patient: Patient | undefined;
    setPatient: Function;
    setSearch: Function;
    handleSearch: Function;
    dropdown: DropDownType;
    setDropdown: Function;
    handleAddPatient: Function;
    handleNew: Function;
    error: string;
    setEmpty: Function;
}

export type AssignPatientModalProps = {
    modalVisible: boolean;
    handleRequestClose: Function;
    user: currentUser
}