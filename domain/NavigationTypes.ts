export type StackParameters = {
    Register : object | undefined,
    Profile : object | undefined,
    Login : object | undefined,
    Home : object | undefined,
    Admin : object | undefined,
    VistaCovid : object | undefined,
    AddRoom : object | undefined,
    DeleteRoom : object | undefined,
    ManageRoom : object | undefined,
    ManageRoles : object | undefined,
    Room: {roomId: string},
    CreateUser: object | undefined
}

export type TabParameters = {
    Profile : object,
    Home : object,
    Room: {roomId: string},
    Register : object
}