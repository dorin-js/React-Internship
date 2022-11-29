import React from 'react';
import { fireEvent, screen, act } from '@testing-library/react';
import { renderWithProviders } from '../../../../utils/test-utils';
import CreateUser from '../../CreateUser';

describe('Create User screen', () => {
  it('should open user form when clicking "New User" button', () => {
    const { getByPlaceholderText, getByRole } = renderWithProviders(
      <CreateUser />,
    );

    const button = getByRole('button', { name: /new user/i });
    act(() => fireEvent.click(button));
    screen.debug();
    expect(getByPlaceholderText('First Name')).toBeInTheDocument();
  });
});
