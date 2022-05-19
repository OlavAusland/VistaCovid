import { act, render } from '@testing-library/react-native';
import { AddRoom } from '../../components/adminView/addRoomView';
import { GraphData, Room } from '../../domain/RoomType';



const testRoom: Room = {
    id: 'A4021',
    patientId: "",
    lastUpdated: Date.now().toString(),
    heartRate: [],
    respirationRate: [],
    oxygenLevel: [],
    notes: []
}

test("renders correctly", () => {
    const tree = render(<AddRoom  />).toJSON();
    expect(tree).toMatchSnapshot();
});