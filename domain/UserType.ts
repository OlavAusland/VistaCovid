export enum Roles {
    ADMIN,                      
    DOCTOR,
    NURSE,
    NONE
};


export type User = {
    email: string,
    password: string,
    code: string | undefined | null,
    firstName: string,
    lastName: string,
    role: Roles,
    phone: string | undefined,
    address: string | undefined,
    city: string | undefined,
}

export type LoginInfo = {
    email: string,
    password: string,
    displayPassword: boolean
}