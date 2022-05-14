
import { act, render } from '@testing-library/react-native';
import { PatientInfoModal } from "../../components/room/PatientInfoModal";



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

test("shows patient when data are fetched", async () => {

    const getPatient = jest.fn().mockReturnValueOnce({
        loading: false,
        data: stubbedPatient,
        error: null,
    });

    const { getByTestId } = render(<PatientInfoModal  handleRequestClose={jest.fn()} fnr="30070123456" />);
    expect(getByTestId("patientInfoModal")).not.toBeNull();

    const lastnametest = getByTestId("lastname") 
    act(async () => {
        expect(lastnametest.props).toContain("Olsen");
      });

    const firstnametest = getByTestId("firstname") 
    act(async () => {
        expect(firstnametest.props).toContain("Siri Hanne");
    });
    
    const ssntest = getByTestId("ssn") 
    act(async () => {
        expect(ssntest.props).toContain("30070123456");
    });
});





