import { FolkeregisterPatient } from "../domain/PatientType";
import * as patientMapper from "./mappers/patientMapper";

//192.168.1.6
export const getPatient = async (fnr: string): Promise<FolkeregisterPatient> => {
    console.log("inside getPatient");
    const result = await fetch(
        `http://192.168.40.196:3001/api/folk/hentPersonMedFNr/${fnr}`,
        {
            method: "GET",
            headers: {
                Accept: "application/json"
            }
        }
    );
    if (!result.ok) {
        if (result.status === 404) {
            console.log("404!");
            throw new Error("Patient not found");
        }
        throw new Error(
            `Call to folkeregisteret failed with status ${result.status} ${result.statusText}`
        );
    }

    const data = await result.json();
    console.log(data)
    const patient = patientMapper.mapDataToPatient(data);
    return patient;
};
