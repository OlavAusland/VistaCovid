import renderer from 'react-test-renderer';

import {PatientInfoModal} from '../../components/room/PatientInfoModal';

it('renders correctly', () => {
    const tree = renderer.create(<PatientInfoModal />).toJSON();
    expect(tree).toMatchSnapshot();
});