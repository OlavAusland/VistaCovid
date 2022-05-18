import {AssignPatientModal} from '../../components/home/AssignPatientToRoomModal';
import { render } from '@testing-library/react-native';
import { Roles } from '../../domain/UserType';
import { auth } from '../../firebase-config';

const currentUser = {
  email: 'hanne@gamil.com',
  firstName: 'Hanne', 
  lastName: 'Olsen',
  role: Roles.NURSE,
  id: '38hsiha29120ijbef929120'
}


jest.mock('../../firebase-config.ts')
test("renders correctly", () => {
  // @ts-ignore
  auth = currentUser;
  
  const tree = render(<AssignPatientModal modalVisible={true} handleRequestClose={jest.fn()}/>).toJSON();
  expect(tree).toMatchSnapshot();
});