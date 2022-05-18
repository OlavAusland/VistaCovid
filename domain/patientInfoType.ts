import { Patient } from "./PatientType";

export type PatientInfoModalProps = {
    handleRequestClose: Function;
    patient: Patient | undefined;
}
