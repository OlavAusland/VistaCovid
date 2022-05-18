import { Text, View, Pressable, Modal,ScrollView, TouchableOpacity, Touchable  } from 'react-native';
import { createRef, useEffect, useState } from 'react';
import Checkbox from "expo-checkbox";
import { exportStyles } from '../styles/ExportModalStyle';
import { getOccupiedRooms } from '../api/firebaseAPI';
import { csvexport } from '../utils/csvexport';
import { PreviewModal } from './export/previewModal';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParameters } from '../domain/NavigationTypes';
import DateChooser from './export/DateChooser';
import { Moment } from 'moment';
import { styles } from 'react-native-element-dropdown/src/components/TextInput/styles';

type DateState = {
    fromDate: Moment | undefined,
    toDate: Moment | undefined
    showDatePicker: "from" | "to" | undefined
}

export const Export = () => {
    const navigation = useNavigation<NativeStackNavigationProp<StackParameters>>();

    const [checkedRooms, setCheckedRooms] = useState(new Map());
    const [previewVisible, setPreviewVisible] = useState(false);
    const [csv, setCsv] = useState<string>("");
    const [date, setDate] = useState<DateState>({
        fromDate: undefined,
        toDate: undefined,
        showDatePicker: undefined
    });

useEffect(() => {
    const getRooms = async () => {
        const fetchedRooms = await getOccupiedRooms();
        const checkedBoxes = new Map<string, boolean>();

        fetchedRooms.forEach((item) => {
            checkedBoxes.set(item.id, false);
        });

        setCheckedRooms(checkedBoxes);
    };
    getRooms();
}, []);


const handleCheckbox = (key: any) => {
    setCheckedRooms(new Map(checkedRooms.set(key, !checkedRooms.get(key))));
}

const handleExport = async () => {
    const roomsToExport: string[] = [];
    checkedRooms.forEach((value, key) => {
        if (value) {
            roomsToExport.push(key);
        }
    });
 
    const response = await csvexport(roomsToExport, date.fromDate, date.toDate);
    setCsv(response);
    setPreviewVisible(true);

}

const setDateTime = (dateTime: Moment) => {
    if (date.showDatePicker === "from") {
        setDate({
            ...date, fromDate: dateTime, showDatePicker: undefined
        });
    } else if (date.showDatePicker === "to") {
        setDate({
            ...date, toDate: dateTime, showDatePicker: undefined
        });
    }
}

const handleCloseDateChooser = () => {
    setDate({
        ...date, showDatePicker: undefined
    });
}

const dateChooser = () => {
    if (date.showDatePicker === "from") {
        return (
            <DateChooser setDateTime={setDateTime} handleCloseDateChooser={handleCloseDateChooser} />
        );
    } else if (date.showDatePicker === "to") {
        return (
            <DateChooser setDateTime={setDateTime} handleCloseDateChooser={handleCloseDateChooser} />
        );
    }
}

if (previewVisible) {
    return (<PreviewModal csv={csv} setPreviewVisible={setPreviewVisible} />)
}

return(
    <View style={{flex:1}}>
        {dateChooser()}
        <View style={[exportStyles.shadow, {flex:2, justifyContent:'center', alignItems:'center', backgroundColor:'#9DD4FB'}]}> 
            <Text style={{fontSize:35, fontWeight:'bold'}}>Export Data To File</Text>
            <Text style={{fontSize:20}}>Choose Rooms To Export:</Text>
        </View>
        <View style={{flex:6, }}>
            <ScrollView style={[{}]}>     
                {checkedRooms.size > 0 &&
                    Array.from(checkedRooms).map(([key, value], index) => {
                        return (
                            <View key={'En key' + index} style={exportStyles.bodyScrollcontent}>
                                <TouchableOpacity onPress={() => {handleCheckbox(key)}}
                                style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                                    <Checkbox key={"checkbox-" + key} value={value} onValueChange={() => handleCheckbox(key)} />
                                    <Text style={exportStyles.bodyScrollText}>{key}</Text>
                                </TouchableOpacity>

                            </View>
                        );
                    })
                }           
            </ScrollView>
        </View>
        <View style={[exportStyles.shadow, {flex:1, backgroundColor:'#9DD4FB', paddingTop:5}]}>
            <View style={{flex:1, justifyContent:'center'}}>
                <View style={{flexDirection:'row', justifyContent:'space-around', alignItems:'center'}}>
                    <TouchableOpacity onPress={() => setDate({ ...date, showDatePicker: "from"})} 
                    style={{flexBasis:'45%', justifyContent:'center', alignItems:'center', backgroundColor:'#0274a1', paddingTop:10, paddingBottom:10, borderRadius:10}}>
                        <Text style={{color:'white'}}>Start Date</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setDate({ ...date, showDatePicker: "to"})} 
                    style={{flexBasis:'45%', justifyContent:'center', alignItems:'center', backgroundColor:'#0274a1', paddingTop:10, paddingBottom:10, borderRadius:10}}>
                        <Text style={{color:'white'}}>End Date</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[{flex:1, justifyContent:'center', alignItems:'center'}]}>
                <TouchableOpacity
                onPress={() => handleExport()}
                style={[{backgroundColor:'#0274a1', width:'95%', alignItems:'center', justifyContent:'center', paddingTop:10, paddingBottom:10, borderRadius:10}]}>
                    <Text style={{color:'white'}}>Export</Text>
                </TouchableOpacity>
            </View>
        </View>

    </View>
)
}
