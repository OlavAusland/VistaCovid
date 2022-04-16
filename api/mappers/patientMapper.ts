import { FolkeregisterPatient } from "../../domain/PatientType";

export const mapDataToPatient = (
    data: FolkeregisterDto
): FolkeregisterPatient => {
    if (
        data.person.adressebeskyttelse[0].graderingsnivå === "ugradert" ||
        !data.person.adressebeskyttelse[0]
    ) {
        return {
            firstname: data.person.personnavn[0]
                ? data.person.personnavn[0].fornavn
                : "",
            lastname: data.person.personnavn[0]
                ? data.person.personnavn[0].etternavn
                : "",
            midlename: data.person.personnavn[0]
                ? data.person.personnavn[0].mellomnavn
                : "",
            ssn: data.person.identifikasjonsnummer[0].fødselsEllerDNnummer,
            gender: data.person.kjønn[0] ? data.person.kjønn[0].kjønn : "",
            address: data.person.bostedsadresse[0].vegadresse
                ? data.person.bostedsadresse[0].vegadresse.adressenavn
                : "",
            housenumber: data.person.bostedsadresse[0]
                ? data.person.bostedsadresse[0].vegadresse.adressenummer
                : "",
            city: data.person.bostedsadresse[0]
                ? data.person.bostedsadresse[0].vegadresse.poststed
                : "",
            coAddress: data.person.bostedsadresse[0]
                ? data.person.bostedsadresse[0].vegadresse.coAdressenavn
                : "",
            gradering: data.person.adressebeskyttelse[0].graderingsnivå
                ? data.person.adressebeskyttelse[0].graderingsnivå
                : "",
        };
    } else {
        return {
            firstname: data.person.personnavn[0]
                ? data.person.personnavn[0].fornavn
                : "",
            lastname: data.person.personnavn[0]
                ? data.person.personnavn[0].etternavn
                : "",
            midlename: data.person.personnavn[0]
                ? data.person.personnavn[0].mellomnavn
                : "",
            ssn: data.person.identifikasjonsnummer[0].fødselsEllerDNnummer,
            gender: data.person.kjønn[0] ? data.person.kjønn[0].kjønn : "",
            address: "Not Available",
            housenumber: "",
            city: "",
            coAddress: "",
            gradering: "",
        };
    }
};

interface FolkeregisterDto {
    person: PersonDto;
}

interface PersonDto {
    personnavn: PersonnavnDto[];
    adressebeskyttelse: AdressebeskyttelseDto[];
    kjønn: KjønnDto[];
    identifikasjonsnummer: IdentifikasjonDto[];
    bostedsadresse: BostedsadresseDto[];
}

interface PersonnavnDto {
    fornavn: string;
    mellomnavn: string;
    etternavn: string;
}

interface AdressebeskyttelseDto {
    graderingsnivå: string;
}

interface KjønnDto {
    kjønn: string;
}

interface IdentifikasjonDto {
    status: string;
    fødselsEllerDNnummer: string;
    identifikatortype: string;
}

interface BostedsadresseDto {
    vegadresse: VegadresseDto;
}
interface VegadresseDto {
    kommunenummer: string;
    bruksenhetsnummer: string;
    bruksenhetstype: string;
    adressenavn: string;
    adressenummer: string;
    adressekode: string;
    adressetileggsnavn: string;
    poststed: string;
    coAdressenavn: string;
}
