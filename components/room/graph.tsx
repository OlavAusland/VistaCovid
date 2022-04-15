import { LineChart } from 'react-native-chart-kit';
import { LineChartData } from '../../types/GraphTypes';
import { TouchableOpacity, Dimensions, Platform} from 'react-native';
import { Room, GraphData} from '../../types/RoomType';

export type GraphProps = {
    data: GraphData[] | undefined,
    name: string
}

export const LineGraph = (props: GraphProps) => {

    const xData = props.data?.map((res: GraphData) => {return res.time.toString()});
    const yData = props.data?.map((res: GraphData) => {return res.value});

    return(
        <TouchableOpacity>
            <LineChart
            data={{
                labels: xData ? xData : [],
                datasets: [
                    {
                        data: yData ? yData : [],
                    }
                ],
                legend: [props.name]
            }}
            width={Platform.OS === 'android' ? Dimensions.get('window').width / 1.1 : 375} // from react-native
            height={200}
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
            fromZero={true}
        />
        </TouchableOpacity>
    )
}