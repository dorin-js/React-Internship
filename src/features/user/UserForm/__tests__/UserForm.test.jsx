import React from 'react';
import { fireEvent, render, act, screen } from '@testing-library/react';
import UserForm from '../UserForm';
import { renderWithProviders } from '../../../../utils/test-utils';
import {
  useUpdateUserMutation, useCreateNewUserMutation
} from '../../../../services/api/apiService';

jest.mock('../../../../services/api/apiService', () => ({
  useCreateNewUserMutation: jest.fn(),
  useUpdateUserMutation: jest.fn(),
}));

describe('Render form', () => {
  beforeEach(() => {
    useCreateNewUserMutation.mockImplementation(() => ({}))
    useUpdateUserMutation.mockImplementation(() => ({}))
  });

  it('should render correctly', () => {
    const createNewUser = jest.fn();
    const updateUser = jest.fn();
    useUpdateUserMutation.mockImplementation(() => ([
      updateUser,
      { isLoading: false, isError: false, error: null }
    ]));
    useCreateNewUserMutation.mockImplementation(() => ([
      createNewUser,
      { isSucces: true, isLoading: false, isError: false, error: null }
    ]));
    const { baseElement } = render(<UserForm />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should make an api call to create new user with given input values', async () => {
    const createNewUser = jest.fn();
    const updateUser = jest.fn();
    useUpdateUserMutation.mockImplementation(() => ([
      updateUser,
      { isLoading: false, isError: false, error: null }
    ]));
    useCreateNewUserMutation.mockImplementation(() => ([
      createNewUser,
      { isSucces: true, isLoading: false, isError: false, error: null }
    ]));

    const { getByPlaceholderText, getByRole } = renderWithProviders(
      <UserForm />
    );

    fireEvent.change(getByPlaceholderText('First Name'), { target: { value: 'Test' } });
    fireEvent.change(getByPlaceholderText('Last Name'), { target: { value: 'Test1' } });
    fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'test@mail.co' } });
    fireEvent.change(getByPlaceholderText('Date of birth'), { target: { value: '2020-05-12' } });

    fireEvent.click(getByRole('button', { name: 'Create' }));

    expect(createNewUser).toHaveBeenCalledWith({
      name: 'Test',
      lastname: 'Test1',
      email: 'test@mail.co',
      birth: '2020-05-12',
      id: '',
    });
  });
});
