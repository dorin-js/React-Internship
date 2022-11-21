import React from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import UsersTable from '../../../features/users/UsersTable/UsersTable';
import UserRow from '../../../features/users/UsersTable/UserRow';
import Modal from '../../components/Modal/Modal';

const users = [
  {
    _created: 1668698852.871516,
    _data_type: 'users',
    _is_deleted: false,
    _modified: 1668698852.871524,
    _self_link: 'https://crudapi.co.uk/api/v1/users/fde94e38-a0e8-4244-bbce-65943235bb47',
    _user: 'ca1db56c-83bf-4fca-b2e8-6c31fd33f6ff',
    _uuid: 'fde94e38-a0e8-4244-bbce-65943235bb47',
    birth: '2022-11-28',
    email: 'dorin.ilusca@hotmail.com',
    lastname: 'ggg',
    name: '6346366',
  },
  {
    _created: 1668511679.512981,
    _data_type: 'users',
    _is_deleted: false,
    _modified: 1668511679.512994,
    _self_link: 'https://crudapi.co.uk/api/v1/users/9d549a7f-f881-47fb-b615-16fd0b81078e',
    _user: 'ca1db56c-83bf-4fca-b2e8-6c31fd33f6ff',
    _uuid: '9d549a7f-f881-47fb-b615-16fd0b81078e',
    birth: '2022-09-27',
    email: 'ilusca97@gmail.com',
    lastname: 'ILUSCA',
    name: 'DORIN',
  },
];

describe('Users Screen', () => {
  const handleDelete = jest.fn();
  const handleDetails = jest.fn();

  it('should render table with 2 users', async () => {
    const { baseElement, getByTestId, getAllByTestId } = render(
      <UsersTable>
        {users.map((user) => (
          <UserRow
            // eslint-disable-next-line no-underscore-dangle
            key={user._uuid}
            user={user}
            onDelete={() => handleDelete(user)}
            onUserDetails={() => handleDetails(user)}
          />
        ))}
      </UsersTable>,
    );

    expect(baseElement).toMatchSnapshot();
    expect(getByTestId('row-DORIN')).toBeInTheDocument();

    expect(getAllByTestId(/row/)).toHaveLength(users.length);
    await act(() => {
      // eslint-disable-next-line no-underscore-dangle
      fireEvent.click(getByTestId((`${users[1]._uuid}-details`)));
      waitFor(() => {
        expect(handleDetails).toHaveBeenCalledWith(users[1]);
      });
    });
  });
});
