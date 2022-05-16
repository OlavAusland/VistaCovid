export type StackParameters = {
    Menu : object,
    Register : object | undefined,
    Profile : object,
    Login : object,
    Home : object,
    Admin : object,
    VistaCovid : object,
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
    Register : object,
    Menu : object
}

export type DrawerParameters = {
    Settings : object,
    VistaCovid : object
}