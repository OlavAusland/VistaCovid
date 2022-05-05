export type Patient = {
    firstname: string,
    lastname: string,
    ssn: string,
    phone: string | undefined,
    relatives: string | undefined,
    address: string | undefined,
    city: string | undefined,
    journals: Array<Object> | undefined
}

export type FolkeregisterPerson = {
    firstname: string,
    midlename: string,
    lastname: string,
    ssn: string,
    gender: string,
    address: string,
    housenumber:string,
    city: string,
    coAddress: string,
    gradering: string
}