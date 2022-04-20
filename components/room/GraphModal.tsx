import { Modal, Button, Pressable, ScrollView, Text, TouchableOpacity, View} from "react-native";
import { graphModalStyle } from "../../styles/GraphModalStyles";
import { LineGraph } from "./Graph";
import { GraphData} from "../../types/RoomType";
import { useState } from "react";

import DateTimePicker from '@react-native-community/datetimepicker';

export type GraphModalTypes = {
    data: GraphData[],
    setModal: (modal: boolean) => void,
    modal: boolean
}


export const GraphModal = (props: GraphModalTypes) => {
    const [date, setDate] = useState({dateFrom:{date:new Date(), visible:false}, dateTo:{date:new Date(), visible:false}});

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
                    <TouchableOpacity style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#0274A1'}}
                    onPress={() => setDate({...date, dateFrom:{...date.dateFrom, visible:true}})}>
                        <Text style={{fontSize:20, color:'white'}}>Date From</Text>
                        {date.dateFrom.visible && <DateTimePicker
                            style={{backgroundColor:'black', width: 200, height: 200}}
                            value={date.dateFrom.date}
                            onChange={(event, selectedDate) => {setDate({...date, dateFrom:{date:selectedDate || new Date(), visible:false}})}}
                        />}
                        <Text>{date.dateFrom.date.toUTCString()}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#0274A1'}}
                    onPress={() => setDate({...date, dateTo:{...date.dateTo, visible:true}})}>
                        <Text style={{fontSize:20, color:'white'}}>Date To</Text>
                        {date.dateTo.visible && <DateTimePicker
                            style={{backgroundColor:'black', width: 200, height: 200}}
                            value={date.dateTo.date}
                            onChange={(event, selectedDate) => {setDate({...date, dateTo:{date:selectedDate || new Date(), visible:false}})}}
                        />}
                        <Text>{date.dateTo.date.toUTCString()}</Text>
                    </TouchableOpacity>
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