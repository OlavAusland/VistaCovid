import { ScrollView, View } from 'react-native';
import { LineGraph } from './Graph';
import { roomStyle } from '../../styles/RoomStyles';

import { Room } from '../../types/RoomType';

export type GraphViewProps = {
    room: Room,
    name: string
}


export const GraphView = (props: GraphViewProps) => {
    return (
        <ScrollView contentContainerStyle={roomStyle.body}>
            <View style={roomStyle.graphContainer}>
                <LineGraph data={props.room?.heartRate} name={'Heart Rate'}/>
            </View>
            <View style={roomStyle.graphContainer}>
                <LineGraph data={props.room?.bloodPressure} name={'Blood Pressure'}/>
            </View>
            <View style={roomStyle.graphContainer}>
                <LineGraph data={props.room?.oxygenLevel}  name={'Oxygen Level'}/>
            </View>
        </ScrollView>
    );
}