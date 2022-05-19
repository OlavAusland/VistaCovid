import {AssignPatientModal} from '../../components/home/AssignPatientToRoomModal';
import { render } from '@testing-library/react-native';
import { Roles } from '../../domain/UserType';
import { auth } from '../../firebase-config';
import { NewPatient } from '../../components/home/newPatient';
import { DropDownType } from '../../domain/DropDownType';
import { Patient } from '../../domain/PatientType';
import { ExistingPatient } from '../../components/home/patientExist';
import { ErrorType } from '../../domain/Errortype';

const currentUser = {
  email: 'hanne@gamil.com',
  firstName: 'Hanne', 
  lastName: 'Olsen',
  role: Roles.NURSE,
  id: '38hsiha29120ijbef929120'
}

const testDropdown: DropDownType = {
  open: false,
  value: "0",
  items: [
    { label: 'Nurse', value: '1' },
    { label: 'Doctor', value: '2' }],
  label: ""
}

const testPatient: Patient= {
    firstname: 'Siri',
    midlename: 'Hanne',
    lastname: 'Olsen',
    ssn: '30070123456',
    gender: 'kvinne',
    address: 'maurliveien',
    housenumber: '1',
    city: 'Oslo',
    coAddress: '',
    gradering: 'ugradert'
}




jest.mock('../../firebase-config.ts')
test("AssignPatient renders correctly", () => {
  // @ts-ignore
  auth = currentUser;
  
  const tree = render(<AssignPatientModal modalVisible={true} handleRequestClose={jest.fn()}/>).toJSON();
  expect(tree).toMatchSnapshot();
});

jest.mock('../../firebase-config.ts')
test("NewPatient renders correctly", () => {
  // @ts-ignore
  auth = currentUser;
  
  const tree = render(<NewPatient 
    setPatient={jest.fn()}
    patient =  {testPatient} 
    setSearch = {jest.fn()}
    handleSearch=  {jest.fn()}
    dropdown =  {testDropdown}
    setDropdown=  {jest.fn()}
    handleRequestClose=  {jest.fn()}
    handleNewPatient=  {jest.fn()}
    setNew=  {jest.fn()}
    setError=  {jest.fn()}/>).toJSON();
  expect(tree).toMatchSnapshot();
});

test("Existing Patient renders correctly", () => {
  // @ts-ignore
  auth = currentUser;
  
  const tree = render(<ExistingPatient 
    setPatient={jest.fn()}
    patient =  {testPatient} 
    setSearch = {jest.fn()}
    handleSearch=  {jest.fn()}
    dropdown =  {testDropdown}
    setDropdown=  {jest.fn()}
    handleAddPatient=  {jest.fn()}
    handleNew=  {jest.fn()}
    error=  {'try error'}
    setEmpty=  {jest.fn()}/>).toJSON();
  expect(tree).toMatchSnapshot();
});
