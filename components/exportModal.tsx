import { Text, View, Pressable, Modal } from 'react-native';
import { useEffect, useState } from 'react';
import Checkbox from "expo-checkbox";

import { exportStyles } from '../styles/ExportModalStyle';
import { ScrollView } from 'react-native-gesture-handler';
import { getOccupiedRooms } from '../api/firebaseAPI';
import { csvexport } from '../utils/csvexport';
import { PreviewModal } from './previewModal';


type exportModalProps = {
    handleRequestClose: Function;
}

export const Exportmodal = (props: exportModalProps) => {
    const [checkedRooms, setCheckedRooms] = useState(new Map());
    const [previevVisible, setPreviewVisible] = useState(false);
    const [csv, setCsv] = useState<string>("");

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


    const handleCheckbox = (key:any, isChecked: any) => {
        setCheckedRooms(new Map(checkedRooms.set(key, isChecked)));
    }

    const handleExport = () => {
        const roomsToExport:string[] = [];
        checkedRooms.forEach((value, key) => {
            if (value) {
                roomsToExport.push(key);
            }
        });
        console.log(roomsToExport);
        handleexportcsv(roomsToExport);
        setPreviewVisible(true);
        
    }

    const handleexportcsv = async(roomsToExport: string[]) => {
        console.log('rooms:', roomsToExport);
             const responce = await csvexport({rooms: roomsToExport});
                setCsv(responce);
    }

    if (previevVisible) {
        return(<PreviewModal csv={csv} setPreviewVisible={setPreviewVisible}/>)
    }


    return (
        <Modal
            animationType="slide"
            statusBarTranslucent={true}
            transparent={true}
            onRequestClose={() => props.handleRequestClose()}
            testID="patientInfoModal"
        >
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
                                            <Checkbox key={"checkbox-" + key} value={value} onValueChange={(isChecked) => handleCheckbox(key, isChecked) } />
                                            <Text style={exportStyles.bodyScrollText}>{key}</Text>
                                           
                                        </View>
                                    );
                                })

                            }
                            </ScrollView>
                        </View>
                    </View>
                    <View style={exportStyles.bodyDate}>
                        <Text style={exportStyles.bodyText}>
                            Select date range
                        </Text>
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
                    onPress={() => props.handleRequestClose()}
                    style={{ flex: 1 }} >
                    <View style={exportStyles.button}>
                        <Text style={exportStyles.footerText}>Close</Text>
                    </View>
                </Pressable>
                </View>
                
            </View>
        </Modal>
    );
}
