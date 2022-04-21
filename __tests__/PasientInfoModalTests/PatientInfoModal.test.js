

import React from 'react';
import renderer from 'react-test-renderer';

import {PatientInfoModal} from '../../../../src/components/patient/PatientInfoModal';

it('renders correctly', () => {
    const tree = renderer.create(<PatientInfoModal />).toJSON();
    expect(tree).toMatchSnapshot();
  });