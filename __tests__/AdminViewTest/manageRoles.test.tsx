
import { render } from '@testing-library/react-native';
import { ManageRoles } from "../../components/adminView/manageRoles";
import { Roles } from '../../domain/UserType';

const mockUser = [{
    email: 'test@uia.no',
    password: 'testtest',
    code: undefined,
    firstName: 'test',
    lastName: 'testesen',
    role: Roles.NONE,
    phone: '98767564',
    address: 'testgata 4',
    city: 'oslo',
    id: '23456787656'
},
{
    email: 'test2@uia.no',
    password: 'testtest2',
    code: undefined,
    firstName: 'test2',
    lastName: 'testesen2',
    role: Roles.NONE,
    phone: '98767598',
    address: 'testgata 8',
    city: 'oslo',
    id: '23456787856'
}]
test("renders correctly", () => {
    const tree = render(<ManageRoles/>).toJSON();
    expect(tree).toMatchSnapshot();
});

/* jest.mock("../../api/firebaseAPI");
// Tests with no given range, returns all data for a given room
test("Should disaplay users", async () => {
    
    // @ts-ignore
    getUsers.mockResolvedValueOnce(mockUser);

    const tree = render(<ManageRoles />).toJSON();
    expect(tree).toContain('');

}); */
