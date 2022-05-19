import { act, render } from '@testing-library/react-native';
import moment from 'moment';
import { GraphView } from '../../components/room/GraphView';
import { NoteModal } from '../../components/room/NoteModal';
import { GraphData, Room } from "../../domain/RoomType";


const date = moment("2022-05-15T21:11:48.620Z");

console.log(date);
const heartRate: GraphData[] = [
    {
        time: date.valueOf(),
        value: 100
    },
    {
        time: date.add(1, "minute").valueOf(),
        value: 90
    },
    {
        time: date.add(2, "minute").valueOf(),
        value: 80
    }
]

const respirationRate: GraphData[] = [
    {
        time: date.valueOf(),
        value: 95
    },
    {
        time: date.add(1, "minute").valueOf(),
        value: 85
    },
    {
        time: date.add(2, "minute").valueOf(),
        value: 75
    }
]

const oxygenLevel: GraphData[] = [
    {
        time: date.valueOf(),
        value: 50
    },
    {
        time: date.add(1, "minute").valueOf(),
        value: 40
    },
    {
        time: date.add(2, "minute").valueOf(),
        value: 30
    }
]

const mockRoom: Room = {
    patientId: "123351",
    lastUpdated: new Date().toISOString(),
    heartRate,
    respirationRate: respirationRate,
    oxygenLevel,
    notes: undefined,
    id: "aaaa"
}

// Snapshot test
test("GraphView renders correctly", () => {
    const tree = render(<GraphView room={mockRoom} />).toJSON();
    expect(tree).toMatchSnapshot();
})

test("GraphView renders correctly", () => {
    const tree = render(<NoteModal room={mockRoom} isVisible={true} handleRequestClose={jest.fn()} />).toJSON();
    expect(tree).toMatchSnapshot();
})




test("shows patient not to be empty when data are fetched", async () => {
    
    const { getByTestId } = render(<GraphView room={mockRoom}/>);
    expect(getByTestId("graphView")).not.toBeNull();

});
