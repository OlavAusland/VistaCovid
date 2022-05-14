export type Patient = {
    firstname: string,
    midlename: string,
    lastname: string,
    ssn: string,
    gender: string,
    phone: string | undefined,
    relatives: string | undefined,
    address: string | undefined,
    city: string | undefined,
    housenumber:string,
    coAddress: string,
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