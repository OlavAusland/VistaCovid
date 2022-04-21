import { Modal, Button, Pressable, ScrollView, Text, TouchableOpacity, View} from "react-native";
import { graphModalStyle } from "../../styles/GraphModalStyles";
import { LineGraph } from "./Graph";
import { GraphData} from "../../types/RoomType";
import { useState } from "react";

import DateTimePickerModal from "react-native-modal-datetime-picker";

export type GraphModalTypes = {
    data: GraphData[],
    setModal: (modal: boolean) => void,
    modal: boolean
}


export const GraphModal = (props: GraphModalTypes) => {
    const [date, setDate] = useState({startDate:{date: new Date(), visible: false}, endDate:{date: new Date(), visible: false}});

    

    return (
        <Modal  
            animationType="slide"
            transparent={false}
            visible={props.modal}
            onRequestClose={() => {
                props.setModal(false);
            }}
        >
            <ScrollView contentContainerStyle={graphModalStyle.container}>
                <LineGraph data={[{time:0, value:60}]} name={'Heart Rate'}
                            modal={props.modal} setModal={props.setModal}/>
                <View style={{flexDirection:'row', width:'90%', justifyContent:'center'}}>
                    <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#0274A1', paddingTop:10, paddingBottom:10}}>
                        <Button title="Set Start Date" onPress={() => {setDate({...date, startDate:{...date.startDate, visible: true}})}}/>
                        <DateTimePickerModal
                            isVisible={date.startDate.visible}
                            date={date.startDate.date}
                            mode="date"
                            onConfirm={(newDate: Date) => {setDate({...date, startDate:{date:newDate, visible: false}})}}
                            onCancel={() => {setDate({...date, startDate:{...date.startDate, visible: false}})}}
                        />
                    </View>
                    <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#0274A1', paddingTop:10, paddingBottom:10}}>
                        <Button title="Set End Date" onPress={() => {setDate({...date, endDate:{...date.endDate, visible: true}})}}/>
                        <DateTimePickerModal
                            isVisible={date.endDate.visible}
                            date={date.endDate.date}
                            mode="date"
                            onConfirm={(newDate: Date) => {setDate({...date, endDate:{date:newDate, visible: false}})}}
                            onCancel={() => {setDate({...date, endDate:{...date.endDate, visible: false}})}}
                        />
                    </View>
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