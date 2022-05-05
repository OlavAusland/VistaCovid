
import renderer from 'react-test-renderer';

import {AssignPatientModal} from '../../components/home/AssignPatientToRoomModal';

it('renders correctly', () => {
  const tree = renderer.create(<AssignPatientModal />).toJSON();
  expect(tree).toMatchSnapshot();
});