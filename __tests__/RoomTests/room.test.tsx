import { act, render } from '@testing-library/react-native';
import moment from 'moment';
import { GraphView } from '../../components/room/GraphView';
import { NoteModal } from '../../components/room/NoteModal';
import { NotesView } from '../../components/room/NotesView';
import { GraphData, NoteData, Room } from "../../domain/RoomType";


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
const noteMock: NoteData[] = [{
    author: 'Ole olsen',
    note: 'Hei hei dette er en note',
    date: date.valueOf()
}]
const mockRoom: Room = {
    patientId: "123351",
    lastUpdated: new Date().toISOString(),
    heartRate,
    respirationRate: respirationRate,
    oxygenLevel,
    notes: noteMock,
    id: "aaaa"
}

// Snapshot test
test("GraphView renders correctly", () => {
    const tree = render(<GraphView room={mockRoom} />).toJSON();
    expect(tree).toMatchSnapshot();
})

test("NoteModal renders correctly", () => {
    const tree = render(<NoteModal room={mockRoom} isVisible={true} handleRequestClose={jest.fn()} />).toJSON();
    expect(tree).toMatchSnapshot();
})


test("NoteModal renders correctly", () => {
    const tree = render(<NotesView room={mockRoom} />).toJSON();
    expect(tree).toMatchSnapshot();
})


test("shows GraphView not to be empty when data are fetched", async () => {
    
    const { getByTestId } = render(<GraphView room={mockRoom}/>);
    expect(getByTestId("graphView")).not.toBeNull();

});

test("shows NotesView not to be empty when data are fetched", async () => {
    
    const { getByTestId } = render(<NotesView room={mockRoom}/>);
    expect(getByTestId("NoteView")).not.toBeNull();

});

test("shows Notes when data are fetched", async () => {

    const { getByTestId } = render(<NotesView room={mockRoom}/>);

    const notesTest = getByTestId("Notetest")
    await act(async () => {
        expect(notesTest.props.children).toContain('Hei hei dette er en note');
    });
});
