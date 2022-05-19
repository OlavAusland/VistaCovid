import { DeleteRoomModal } from "../../components/adminView/deleteModal";
import {render } from '@testing-library/react-native';


test("renders correctly", () => {
    const tree = render(<DeleteRoomModal modalVisible={true} handleRequestClose={jest.fn()} deleteRoomAndClose={jest.fn()}    />).toJSON();
    expect(tree).toMatchSnapshot();
});