import { Patient, FolkeregisterPerson } from "./PatientType";

export type PatientInfoModalProps = {
    handleRequestClose: Function;
    patient: Patient | FolkeregisterPerson | undefined;
}
