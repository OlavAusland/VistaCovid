export enum Roles {
    NONE,
    NURSE,
    DOCTOR,
    ADMIN                      
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
    id: string
}

export type SimpleUser = {
    displayName:string,
    role: Roles
}

export type LoginInfo = {
    email: string,
    password: string,
    displayPassword: boolean
}

export type currentUser = {
    email: string,
    firstName: string, 
    lastName: string,
    role: Roles,
    id: string
}