export type StackParameters = {
    Register : object,
    Profile : object,
    Login : object,
    Home : object,
    Admin : object,
    VistaCovid : object,
    AddRoom : object | undefined,
    DeleteRoom : object | undefined,
    ManageRoom : object | undefined,
    ManageRoles : object | undefined,
    Room: {roomId: string}
}

export type TabParameters = {
    Profile : object,
    Home : object,
    Room: {roomId: string},
    Register : object
}