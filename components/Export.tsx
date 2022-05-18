import { Text, View, Pressable, Modal } from 'react-native';
import { useEffect, useState } from 'react';
import Checkbox from "expo-checkbox";
import { exportStyles } from '../styles/ExportModalStyle';
import { ScrollView } from 'react-native-gesture-handler';
import { getOccupiedRooms } from '../api/firebaseAPI';
import { csvexport } from '../utils/csvexport';
import { PreviewModal } from './previewModal';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParameters } from '../domain/NavigationTypes';
import DateTimePickerModal from "react-native-modal-datetime-picker";



export const Export = () => {
    const navigation = useNavigation<NativeStackNavigationProp<StackParameters>>();

    const [checkedRooms, setCheckedRooms] = useState(new Map());
    const [previevVisible, setPreviewVisible] = useState(false);
    const [csv, setCsv] = useState<string>("");
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

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

    const handleExport = () => {
        const roomsToExport: string[] = [];
        checkedRooms.forEach((value, key) => {
            if (value) {
                roomsToExport.push(key);
            }
        });
        console.log(roomsToExport);
        handleExportCsv(roomsToExport);
        setPreviewVisible(true);

    }

    const handleExportCsv = async (roomsToExport: string[]) => {
        console.log('rooms:', roomsToExport);
        const responce = await csvexport({ rooms: roomsToExport });
        setCsv(responce);
    }

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date: Date) => {
        console.warn("A date has been picked: ", date);
        hideDatePicker();
    };

    if (previevVisible) {
        return (<PreviewModal csv={csv} setPreviewVisible={setPreviewVisible} />)
    }


    return (

        <View style={exportStyles.container}>
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
                        <View style= {exportStyles.dateButton}>
                        <Pressable onPress={showDatePicker}>
                            <Text style={exportStyles.buttonText}> Fromdate </Text>
                        </Pressable>
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        />
                        </View>
                        <View style= {exportStyles.dateButton}>
                            <Pressable onPress={showDatePicker}>
                                <Text >Todate</Text>
                            </Pressable>
                            <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                mode="date"
                                onConfirm={handleConfirm}
                                onCancel={hideDatePicker}
                            />
                        </View>
                    </View>
                    <View style={exportStyles.buttonRows} >
                        <View style= {exportStyles.dateButton}>
                        <Pressable onPress={showDatePicker} >
                            <Text >From Time </Text>
                        </Pressable>
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="time"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        />
                        </View>
                        <View style= {exportStyles.dateButton}>
                            <Pressable onPress={showDatePicker} >
                                <Text >To Time</Text>
                            </Pressable>
                            <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                mode="time"
                                onConfirm={handleConfirm}
                                onCancel={hideDatePicker}
                            />
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
