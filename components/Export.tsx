import { Text, View, Pressable, Modal } from 'react-native';
import { createRef, useEffect, useState } from 'react';
import Checkbox from "expo-checkbox";
import { exportStyles } from '../styles/ExportModalStyle';
import { ScrollView } from 'react-native-gesture-handler';
import { getOccupiedRooms } from '../api/firebaseAPI';
import { csvexport } from '../utils/csvexport';
import { PreviewModal } from './export/previewModal';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParameters } from '../domain/NavigationTypes';
import DateChooser from './export/DateChooser';
import { Moment } from 'moment';

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


const handleCheckbox = (key: any, isChecked: any) => {
    setCheckedRooms(new Map(checkedRooms.set(key, isChecked)));
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

return (
    <View style={exportStyles.container}>
        {dateChooser()}
        <View style={exportStyles.header}>
            <Text style={exportStyles.headerText}>Export data to file</Text>
        </View>
        <View style={exportStyles.body}>
            <View style={exportStyles.bodyRoom}>
                <Text style={exportStyles.bodyText}>
                    Choose rooms to export
                </Text>
                <View style={exportStyles.bodyScroll}>
                    <ScrollView>
                        {checkedRooms.size > 0 &&
                            Array.from(checkedRooms).map(([key, value], index) => {
                                return (

                                    <View key={'En key' + index} style={exportStyles.bodyScrollcontent}>
                                        <Checkbox key={"checkbox-" + key} value={value} onValueChange={(isChecked) => handleCheckbox(key, isChecked)} />
                                        <Text style={exportStyles.bodyScrollText}>{key}</Text>

                                    </View>
                                );
                            })

                        }
                    </ScrollView>
                </View>
            </View>
            <View style={exportStyles.bodyDate}>
                <Text style={exportStyles.bodyText}>Select date range </Text>
                <View style={exportStyles.datetext}>
                    <Text >From</Text>
                    <Text >To</Text>
                </View>

                <View style={exportStyles.buttonRows}>
                    <View style={exportStyles.dateButton}>
                        <Pressable onPress={() => setDate({ ...date, showDatePicker: "from"})}>
                            <Text style={exportStyles.buttonText}> From:</Text>
                        </Pressable>
                    </View>
                    <View style={exportStyles.dateButton}>
                        <Pressable onPress={() => setDate({ ...date, showDatePicker: "to"})}>
                            <Text >To:</Text>
                        </Pressable>
                    </View>
                </View>
            </View>

        </View>
        <View style={exportStyles.footer}>
            <Pressable
                onPress={() => handleExport()}
                style={{ flex: 1 }} >
                <View style={exportStyles.button}>
                    <Text style={exportStyles.footerText}>Export</Text>
                </View>
            </Pressable>
            <Pressable
                onPress={() => navigation.navigate('Menu', { screen: 'VistaCovid' })}
                style={{ flex: 1 }} >
                <View style={exportStyles.button}>
                    <Text style={exportStyles.footerText}>Close</Text>
                </View>
            </Pressable>
        </View>

    </View>
);
}
