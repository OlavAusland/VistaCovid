
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';

import {AssignPatientModal} from '../../components/home/AssignPatientToRoomModal';

it('renders correctly', async() => {
  await act(async() => {const tree = await renderer.create(<AssignPatientModal />);
  expect(tree.toJSON()).toMatchSnapshot();})
}); 