import React from 'react';
import {
  act, fireEvent, render, waitFor,
} from '@testing-library/react';
import UsersTable from '../../../features/users/UsersTable/UsersTable';
import UserRow from '../../../features/users/UsersTable/UserRow';
import { usersList } from '../__fixtures__/userList';

describe('Users Screen', () => {
  const handleDelete = jest.fn();
  const handleDetails = jest.fn();

  it('should render table with 2 users', async () => {
    const { baseElement, getByTestId, getAllByTestId } = render(
      <UsersTable>
        {usersList.map((user) => (
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

    expect(getAllByTestId(/row/)).toHaveLength(usersList.length);
    act(() => {
      // eslint-disable-next-line no-underscore-dangle
      fireEvent.click(getByTestId((`${usersList[1]._uuid}-details`)));
      waitFor(() => {
        expect(handleDetails).toHaveBeenCalledWith(usersList[1]);
      });
    });
  });
});
