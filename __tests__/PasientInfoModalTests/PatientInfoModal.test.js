import renderer from 'react-test-renderer';

import {PatientInfoModal} from '../../components/PatientInfoModal';

it('renders correctly', () => {
    const tree = renderer.create(<PatientInfoModal />).toJSON();
    expect(tree).toMatchSnapshot();
});