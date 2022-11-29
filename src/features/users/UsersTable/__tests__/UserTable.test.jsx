import React from 'react';
import { fireEvent, waitFor, screen } from '@testing-library/react';
import { usersList } from '../../__fixtures__/userList';
import { renderWithProviders } from '../../../../utils/test-utils';
import UsersTable from '../UsersTable';

describe('Users Table', () => {
  const onUserDetails = jest.fn();

  it('should render table with 2 users', async () => {
    const {
      baseElement, getByTestId, getAllByTestId, getByRole,
    } = renderWithProviders(
      <UsersTable users={usersList} />,
    );

    expect(baseElement).toMatchSnapshot();

    expect(getByTestId('row-John')).toBeInTheDocument();

    expect(getAllByTestId(/row/)).toHaveLength(usersList.length);

    // screen.debug();
    // fireEvent.click(getByTestId(`${usersList[1].id}-details`));
    // await waitFor(() => {
    //   expect(onUserDetails).toHaveBeenCalledWith(usersList[1]);
    // });
  });
});
