import { ScrollView, View, Text, Button } from "react-native";
import { addUser, deleteUser } from "../api/firebaseAPI";
import {User} from "../domain/UserType";

export function ManageRolesView ()
{
    const newuser: User = {
        email: 'lin@bolle.no',
        password: 'passord1.',
        code: '1234', 
        firstName: 'Lin', 
        lastName: 'Fjeldvik', 
        role: 2,
        phone: '47622868',
        address: 'Jon Lilletuns vei 23',
        city: 'Grimstad'
    }

    return(
        <ScrollView>
            <View>
                <Text>MANAGE ROLES VIEW</Text>
            </View>
            <View>
                <Button title="Add Role" onPress={()=>{addUser(newuser)}}></Button>
                <Button title="Edit Role" onPress={()=>{editUser()}}></Button>
                <Button title="Delete Role" onPress={()=>{deleteUser(id)}}></Button>
            </View>
        </ScrollView>


    );
}