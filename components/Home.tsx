import { useEffect } from 'react';
import { View, Text, Button, TextInput, ScrollView, Dimensions, TouchableOpacity} from 'react-native';
import { homeStyle } from '../styles/HomeStyles';
import { BarChart } from 'react-native-chart-kit';

export function HomeView()
{
    return(
        <View style={homeStyle.container}>
            <View style={homeStyle.header}>
                <TextInput placeholder={'Search For Room'} style={homeStyle.searchBar}/>
            </View>
            <ScrollView style={{flex:4}} contentContainerStyle={homeStyle.body}>
                {
                    [1,2,3,4,5, 6, 7, 8, 9].map((res) => {
                        return (
                            <TouchableOpacity style={homeStyle.card}>
                                <Text style={{flex:1}}> Room: {res}</Text>
                                <BarChart
                                    data={{
                                        labels: ['BL', 'OXL', 'HR'],
                                        datasets: [{
                                            data: [20, 45, 28]
                                        }]
                                    }}
                                    width={Dimensions.get('window').width * 0.9/2}
                                    height={200}
                                    chartConfig={{
                                        backgroundColor: "#e26a00",
                                        backgroundGradientFrom: "#fb8c00",
                                        backgroundGradientTo: "#ffa726",
                                        decimalPlaces: 0, // optional, defaults to 2dp
                                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                        style: {
                                          borderRadius: 8
                                        },
                                        barPercentage: 0.5,
                                        propsForDots: {
                                            r: "3",
                                            strokeWidth: "1",
                                            stroke: "#ffa726"
                                        }
                                      }}
                                      withHorizontalLabels={false}
                                />
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        </View>
    );
}