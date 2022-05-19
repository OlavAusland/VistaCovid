import { act, render } from '@testing-library/react-native';
import { Errormodal } from '../../components';
import { ErrorType } from '../../domain/Errortype';

const errormock: ErrorType = {
    errorObject: new Error('test error'),
    errormodalVisible: true
}
test("renders correctly", () => {
    const tree = render(<Errormodal error={errormock} handleRequestClose ={jest.fn()} />).toJSON();
    expect(tree).toMatchSnapshot();
});

test("shows error message", async () => {
    const { getByTestId } = render(<Errormodal error={errormock} handleRequestClose ={jest.fn()} />);
    expect(getByTestId("patientInfoModal")).not.toBeNull();

    const errormessageTest = getByTestId("errormessage")
    await act(async () => {
        expect(errormessageTest.props.children[2]).toContain("test error");
    });
});
