import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../../../../utils/test-utils';
import { Button } from '../../../../common/components/Button';
import CreateUser from '../../CreateUser';


// jest.mock('../../../common/components/Button', () => ({
//   Button: jest.fn(),
// }));

describe('Create User screen', () => {
  // Button.mockImplementation(() => null);

  it.skip('should open user form when clicking "New User" button', () => {
    // const onClick = jest.fn();
    // Button.mockImplementation(({ onClick }) => (
    //   <button onClick={onClick}>New user</button>
    // ));

    const { getByPlaceholderText, getByRole } = renderWithProviders(<CreateUser />);
    screen.debug();

    const button = getByRole('button', { name: /new user/i });
    fireEvent.click(button);
    expect(getByPlaceholderText('First Name')).toBeInTheDocument();
  });
})