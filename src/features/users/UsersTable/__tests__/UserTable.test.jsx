import React from 'react';
import { usersList } from '../../__fixtures__/userList';
import { renderWithProviders } from '../../../../utils/test-utils';
import UsersTable from '../UsersTable';

describe('Users Table', () => {

  it('should render table with 2 users', async () => {
    const { baseElement, getByTestId, getAllByTestId } = renderWithProviders(
      <UsersTable users={usersList} />
    );

    expect(baseElement).toMatchSnapshot();

    expect(getByTestId('row-John')).toBeInTheDocument();

    expect(getAllByTestId(/row/)).toHaveLength(usersList.length);

    // fireEvent.click(getByRole(('button', { name: 'Show Details'})));
    // await waitFor(() => {
    //   expect().toHaveBeenCalledWith(usersList[1]);
    // });
  });
})