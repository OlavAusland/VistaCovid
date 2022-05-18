import { Patient } from "../domain/PatientType";
import * as patientMapper from "./mappers/patientMapper";

//192.168.1.6
export const getPatient = async (fnr: string): Promise<Patient> => {
    const result = await fetch(
        `http://192.168.1.17:3001/api/folk/hentPersonMedFNr/${fnr}`,
        {
            method: "GET",
            headers: {
                Accept: "application/json"
            }
        }
    );
    if (!result.ok) {
        if (result.status === 404) {
            console.log("Patient not found");
            throw new Error("Patient not found");
           
        }
        console.log(`Call to folkeregisteret failed with status ${result.status} ${result.statusText}`);
        
        throw new Error(
            `Call to folkeregisteret failed with status ${result.status} ${result.statusText}`
        );
    }

    const data = await result.json();
    const patient = patientMapper.mapDataToPatient(data);
    return patient;
};
