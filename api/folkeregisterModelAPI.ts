import { FolkeregisterPerson } from "../domain/PatientType";
import * as patientMapper from "./mappers/patientMapper";

//192.168.1.6

export const getPatient = async (fnr: string): Promise<FolkeregisterPerson> => {
    const result = await fetch(
        `http://192.168.1.6:3001/api/folk/hentPersonMedFNr/${fnr}`,
        {
            method: "GET",
            headers: {
                Accept: "application/json"
            }
        }
    );
    if (!result.ok) {
        if (result.status === 404) {
            throw new Error("Patient not found");
        }
        throw new Error(
            `Call to folkeregisteret failed with status ${result.status} ${result.statusText}`
        );
    }

    const data = await result.json();
    const patient = patientMapper.mapDataToPatient(data);
    return patient;
};
