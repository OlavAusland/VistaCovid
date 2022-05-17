import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { LineGraph } from './Graph';
import { roomStyle } from '../../styles/RoomStyles';
import { Room } from '../../domain/RoomType';

export type GraphViewProps = {
    room: Room,
    setModal: (modal: boolean) => void,
    modal: boolean
}

export  const GraphView = (props: GraphViewProps) => {
    return (
        <ScrollView contentContainerStyle={roomStyle.body}>
            <View style={roomStyle.graphContainer}>
                <LineGraph color={'#eb4034'} data={props.room?.heartRate} name={'Heart Rate'}
                            modal={props.modal} setModal={props.setModal}/>
            </View>
            <View style={roomStyle.graphContainer}>
                <LineGraph color={'#edb855'} data={props.room?.bloodPressure} name={'Blood Pressure'}
                            modal={props.modal} setModal={props.setModal}/>
            </View>
            <View style={roomStyle.graphContainer}>
                <LineGraph color={'#6ed7e0'} data={props.room?.oxygenLevel}  name={'Oxygen Level'}
                            modal={props.modal} setModal={props.setModal}/>
            </View>
        </ScrollView>
    );
}