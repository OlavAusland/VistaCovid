import { Modal, Pressable, ScrollView, Text, TouchableOpacity, View} from "react-native";
import { graphModalStyle } from "../../styles/GraphModalStyles";
import { LineGraph } from "./Graph";

export const GraphModal = (props: any) => {
    return (
        <Modal
            animationType="fade"
            transparent={false}
            visible={props.visible}
            onRequestClose={() => {
                props.setModal(false);
            }}
        >
            <ScrollView contentContainerStyle={graphModalStyle.container}>
                <LineGraph data={[{time: 0, value:60}, {time:1, value:80}]} name={'shees'}/>
                <View style={{flexDirection:'row', justifyContent:'center'}}>
                    <Pressable>
                        <Text>Press me</Text>
                    </Pressable>
                    <Pressable>
                        <Text>Press me</Text>
                    </Pressable>
                </View>
                <View style={graphModalStyle.notes}>
                    <Text></Text>
                </View>
                <TouchableOpacity onPress={() => {props.setModal(false)}}>
                    <Text>Exit</Text>
                </TouchableOpacity>
            </ScrollView>
        </Modal>
    );
}