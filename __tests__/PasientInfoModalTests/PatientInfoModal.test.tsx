import React from 'react';
import { render } from '@testing-library/react-native';
import { PatientInfoModal } from "../../components/room/PatientInfoModal";
import {getPatient} from "../../api/folkeregisterModelAPI";



// Snapshot test
test("renders correctly", () => {
    const tree = render(<PatientInfoModal modalVisible={true} handleRequestClose={jest.fn()} fnr="12313" />).toJSON();
    expect(tree).toMatchSnapshot();
});

//Unit tests

const stubbedPatient = [
    {
        person: {
            personnavn: [
                {
                    fornavn: "Siri",
                    mellomnavn: "Hanne",
                    etternavn: "Olsen",
                },
            ],
            bostedsadresse: [
                {
                    vegadresse: {
                        kommunenummer: "0301",
                        bruksenhetsnummer: "0101",
                        bruksenhetstype: "bolig",
                        adressenavn: "maurliveien",
                        adressenummer: "1",
                        adressekode: "",
                        adressetileggsnavn: "",
                        poststed: "Oslo",
                        coAdressenavn: "",
                    },
                },
            ],
            adressebeskyttelse: [
                {
                    graderingsnivå: "ugradert",
                },
            ],
            kjønn: [
                {
                    kjønn: "kvinne",
                },
            ],
            identifikasjonsnummer: [
                {
                    status: "iBruk",
                    fødselsEllerDNnummer: "30070123456",
                    identifikatortype: "fødselsnummer",
                },
            ],
        },
    },
];

test("shows patient when data are fetched", () => {

    const getPatient = jest.fn().mockReturnValueOnce({
        loading: false,
        data: stubbedPatient,
        error: null,
    });

    const { getByTestId } = render(<PatientInfoModal modalVisible={true} handleRequestClose={jest.fn()} fnr="30070123456" />);
    expect(getByTestId("patientInfoModal")).not.toBeNull();
    
    const test = getByTestId("lastname") 
    console.log(test);
    expect(test).toContain("Olsen");
});






/*describe("Response for patient 30070123456 request", () => {
    it("should return status code 200 and a defined body as response", async () => {
        // Mock API
        jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
                json: () =>
                    Promise.resolve({
                        status: 200,
                        data: stubbedPatient,
                    }),
            })
        );

        const result = await getPatient("30070123456");

        expect(result.status).toBe(200);
        expect(result.data).toBe(stubbedPatient);
    });
});
*/



