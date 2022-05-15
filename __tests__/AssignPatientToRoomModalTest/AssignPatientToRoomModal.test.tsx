import {AssignPatientModal} from '../../components/home/AssignPatientToRoomModal';
import { PatientInfoModal } from '../../components/room/PatientInfoModal';
import { render, waitFor } from '@testing-library/react-native';
import React from 'react';

test('renders correctly', async() => {
  const tree = render(<AssignPatientModal modalVisible={true} handleRequestClose={jest.fn()} user={}/>);
  await waitFor(() => {
    expect(tree.toJSON()).toMatchSnapshot();
  });
}); 