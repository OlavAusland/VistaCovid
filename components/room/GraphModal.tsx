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
                <LineGraph data={[{time: 0, value:60}, {time:1, value:80}]}/>
                <View style={{flexDirection:'row', justifyContent:'center'}}>
                    <Pressable>
                        <Text>Press me</Text>
                    </Pressable>
                    <Pressable>
                        <Text>Press me</Text>
                    </Pressable>
                </View>
                <View style={graphModalStyle.notes}>
                    <Text>Hello asdukloa sslajd lkasjd klasjdklsajd lkasjd klasj dklasj dklasjd klasjd klasjd lkasjd lkasjdl kasj dklasjd lkasj daklsjd klasdj lkasjd lkas djaskldj alsk djaskl djaslkd jaskld</Text>
                </View>
                <TouchableOpacity onPress={() => {props.setModal(false)}}>
                    <Text>Exit</Text>
                </TouchableOpacity>
            </ScrollView>
        </Modal>
    );
}