import renderer from "react-test-renderer";
import { PatientInfoModal } from "../../components/room/PatientInfoModal";
import {getPatient} from "../../api/folkeregisterModelAPI";

it("renders correctly", () => {
    const tree = renderer.create(<PatientInfoModal />).toJSON();
    expect(tree).toMatchSnapshot();
});

//Test API request

   const fetch= () => {
        return {
            status: 200,
            data: stubbedPatient,
        };
    }
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
describe("Response for patient 30070123456 request", () => {
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



