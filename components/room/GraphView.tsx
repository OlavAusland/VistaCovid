import { ScrollView, View } from 'react-native';
import { Room } from '../../domain/RoomType';
import { roomStyle } from '../../styles/RoomStyles';
import { LineGraph } from './Graph';

export type GraphViewProps = {
    room: Room,
}

export  const GraphView = (props: GraphViewProps) => {
    return (
        <ScrollView testID='graphView' contentContainerStyle={roomStyle.body}>
            <View testID='HR' style={roomStyle.graphContainer}>
                <LineGraph  color={'#eb4034'} data={props.room?.heartRate} name={'Heart Rate'}/>
            </View>
            <View testID='RR'style={roomStyle.graphContainer}>
                <LineGraph color={'#edb855'} data={props.room?.respirationRate} name={'Respiration Rate'}/>
            </View>
            <View testID='O2' style={roomStyle.graphContainer}>
                <LineGraph color={'#6ed7e0'} data={props.room?.oxygenLevel}  name={'Oxygen Level'}/>
            </View>
        </ScrollView>
    );
}