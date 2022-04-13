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