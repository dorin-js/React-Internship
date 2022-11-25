import React from 'react';
import {
  act, fireEvent, render, waitFor,
} from '@testing-library/react';
import UsersTable from '../UsersTable/UsersTable';
import UserRow from '../UsersTable/UserRow';
import { usersList } from '../__fixtures__/userList';

describe('Users Screen', () => {
  const handleDelete = jest.fn();
  const handleDetails = jest.fn();

  it('should render table with 2 users', async () => {
    const { baseElement, getByTestId, getAllByTestId } = render(
      <UsersTable>
        {usersList.map((user) => (
          <UserRow
            key={user.id}
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
      fireEvent.click(getByTestId((`${usersList[1].id}-details`)));
      waitFor(() => {
        expect(handleDetails).toHaveBeenCalledWith(usersList[1]);
      });
    });
  });
});
