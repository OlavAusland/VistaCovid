import {AssignPatientModal} from '../../components/home/AssignPatientToRoomModal';
import { render } from '@testing-library/react-native';
import { Roles } from '../../domain/UserType';

const currentUser = {
  email: 'hanne@gamil.com',
  firstName: 'Hanne', 
  lastName: 'Olsen',
  role: Roles.NURSE,
  id: '38hsiha29120ijbef929120'
}


test("renders correctly", () => {
  const tree = render(<AssignPatientModal modalVisible={true} handleRequestClose={jest.fn()} user={currentUser}/>).toJSON();
  expect(tree).toMatchSnapshot();
});