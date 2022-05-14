import React, { ScrollView, TextInput, View } from "react-native";
import { adminStyle } from "../../styles/AdminStyles";


export function EditRoom()
{
    return(
        <ScrollView>
            <View>
                <TextInput
                placeholder="Room Number"
                style={adminStyle.editRoomInput}/>
                <TextInput
                placeholder="Patient ID"
                style={adminStyle.editRoomInput}/>
                <TextInput
                placeholder="Notes"
                style={adminStyle.editRoomInput}/>
            </View>
        </ScrollView>

    );
}