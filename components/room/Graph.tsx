import { Dimensions, Platform, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { GraphData } from '../../domain/RoomType';

export type GraphProps = {
    data: GraphData[] | undefined,
    name: string,
    color: string
}

export const LineGraph = (props: GraphProps) => {

    const xData = props.data?.map((res: GraphData) => {return res.time.toString()});
    const yData = props.data?.map((res: GraphData) => {return res.value});

    return(
        <TouchableOpacity>
            <LineChart
            data={{
                labels: [],
                datasets: [
                    {
                        data: yData? yData.slice(-15) : [],
                    }
                ],
                legend: [props.name]
            }}
            width={Platform.OS === 'android' ? Dimensions.get('window').width / 1.1 : 375} // from react-native
            height={200}
            xAxisLabel='s'
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
                useShadowColorFromDataset:true,
                fillShadowGradientOpacity:0.5,
                backgroundGradientFrom: props.color,
                backgroundGradientTo: props.color,
                decimalPlaces: 1, // optional, defaults to 2dp
                color: () => '#C1E8FD',
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                    borderRadius: 16
            },
            propsForDots: {
                r: "2",
                strokeWidth: "4",
                stroke: "#000000"
            }
            }}
            style={{
                marginVertical: 8,
                borderRadius: 16,
            }}
            fromZero={false}
        />
        </TouchableOpacity>
    )
}
