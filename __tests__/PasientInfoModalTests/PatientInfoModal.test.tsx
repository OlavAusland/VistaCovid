
import { act, render } from '@testing-library/react-native';
import { PatientInfoModal } from "../../components/room/PatientInfoModal";
import { FolkeregisterPerson } from '../../domain/PatientType';

const folkeregisterPerson: FolkeregisterPerson = {
    firstname: 'Siri',
    midlename: 'Hanne',
    lastname: 'Olsen',
    ssn: '30070123456',
    gender: 'kvinne',
    address: 'maurliveien',
    housenumber: '1',
    city: 'Oslo',
    coAddress: '',
    gradering: 'ugradert'
}



// Snapshot test
test("renders correctly", () => {
    const tree = render(<PatientInfoModal handleRequestClose={jest.fn()} patient={folkeregisterPerson} />).toJSON();
        expect(tree).toMatchSnapshot();
});

//Unit tests
/* 
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
]; */


test("shows patient when data are fetched", async () => {

    /* const getPatient = jest.fn().mockReturnValueOnce({
        loading: false,
        data: stubbedPatient,
        error: null,
    }); */

    const { getByTestId } = render(<PatientInfoModal handleRequestClose={jest.fn()} patient={folkeregisterPerson}/>);
    expect(getByTestId("patientInfoModal")).not.toBeNull();

    const lastnametest = getByTestId("lastname") 
    await act(async () => {
        expect(lastnametest.props.children).toContain("Olsen");
      });

    const firstnametest1 = getByTestId("firstname") 
    await act(async () => {
        expect(firstnametest1.props.children[0]).toContain("Siri" );
    });

    const firstnametest2 = getByTestId("firstname") 
    await act(async () => {
        expect(firstnametest2.props.children[2]).toContain("Hanne");
    });
        
    const ssntest = getByTestId("ssn") 
    await act(async () => {
        expect(ssntest.props.children).toContain("30070123456");
    });

    const gendertest = getByTestId("gender") 
    await act(async () => {
        expect(gendertest.props.children).toContain("kvinne");
    });

    const addresstest1 = getByTestId("address") 
    await act(async () => {
        expect(addresstest1.props.children[0]).toContain("maurliveien");
    });
    
    const addresstest2 = getByTestId("address") 
    await act(async () => {
        expect(addresstest2.props.children[2]).toContain("1");
    });

    const citytest = getByTestId("city") 
    await act(async () => {
        expect(citytest.props.children).toContain("Oslo");
    });

    const coaddress = getByTestId("co.address") 
    await act(async () => {
        expect(coaddress.props.children).toContain("");
    });

});





