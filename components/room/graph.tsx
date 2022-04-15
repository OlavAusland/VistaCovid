import { LineChart } from 'react-native-chart-kit';
import { LineChartData } from '../../domain/GraphTypes';

import { Room, GraphData} from '../../domain/RoomType';

export const LineGraph = (props: any) => {

    
    const xData = props.room?.heartRate?.map((res: GraphData) => {return res.time});
    const yData = props.room?.heartRate?.map((res: GraphData) => {return res.value});

    return(
        <LineChart
            data={{
            labels: xData ? xData : [],
            datasets: [
                {
                    data: yData ? yData : [],
                }
            ]
            }}
            width={600} // from react-native
            height={300}
            xAxisLabel='s'
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 1, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                    borderRadius: 16
            },
            propsForDots: {
                r: "4",
                strokeWidth: "2",
                stroke: "#ffa726"
            }
            }}
            style={{
                marginVertical: 8,
                borderRadius: 16,
            }}
        />
    )
}