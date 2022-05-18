import { Text, View, Pressable, Modal } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { saveFile } from '../../utils/csvWriter';
import { previewStyles } from '../../styles/PreviewStyles';

type previewModalProps = {
    csv: string,
    setPreviewVisible: Function
}

export const PreviewModal = (props: previewModalProps) => {

    const handlePreviewClose = () => {
        props.setPreviewVisible(false);
    }
    const handleExportToFile = () => {
        saveFile('data', props.csv);
    }

    return (
        <Modal
            animationType="slide"
            statusBarTranslucent={true}
            transparent={true}
            onRequestClose={() => handlePreviewClose()}
            testID="patientInfoModal"
        >
            <View style={previewStyles.container}>
                <View style={[previewStyles.header, previewStyles.shadow]}>
                    <Text style={previewStyles.headerText}>Preview of CSV file:</Text>
                </View>
                <View style={previewStyles.body}>
                    <ScrollView contentContainerStyle={previewStyles.bodyRoom}>
                        <Text>{props.csv}</Text>
                    </ScrollView>

                </View>
                <View style={previewStyles.footer}>
                    <Pressable
                        onPress={() => handleExportToFile()}
                        style={previewStyles.pressables} >
                        <View style={previewStyles.button}>
                            <Text style={previewStyles.footerText}>Export</Text>
                        </View>
                    </Pressable>
                    <Pressable
                        onPress={() => handlePreviewClose()}
                        style={previewStyles.pressables} >
                        <View style={previewStyles.button}>
                            <Text style={previewStyles.footerText}>Close</Text>
                        </View>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}
