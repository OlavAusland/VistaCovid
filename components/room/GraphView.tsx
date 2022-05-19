import { ScrollView, View } from 'react-native';
import { Room } from '../../domain/RoomType';
import { roomStyle } from '../../styles/RoomStyles';
import { LineGraph } from './Graph';

export type GraphViewProps = {
    room: Room,
}

export  const GraphView = (props: GraphViewProps) => {
    return (
        <ScrollView contentContainerStyle={roomStyle.body}>
            {props.room.heartRate.length > 0 &&
                <View style={roomStyle.graphContainer}>
                    <LineGraph color={'#eb4034'} data={props.room?.heartRate} name={'Heart Rate'}/>
                </View>
            }
            {props.room.respirationRate.length > 0 &&
                <View style={roomStyle.graphContainer}>
                    <LineGraph color={'#edb855'} data={props.room?.respirationRate} name={'Respiration Rate'}/>
                </View>
            }
            {props.room.oxygenLevel.length > 0 &&
                <View style={roomStyle.graphContainer}>
                    <LineGraph color={'#6ed7e0'} data={props.room?.oxygenLevel}  name={'Oxygen Level'}/>
                </View>
            }
        </ScrollView>
    );
}