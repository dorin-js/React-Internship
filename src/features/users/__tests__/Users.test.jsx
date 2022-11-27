import React from 'react';
import {
  act, fireEvent, render, waitFor, screen,
} from '@testing-library/react';
import Users from '../Users';
import { usersList } from '../__fixtures__/userList';
import { renderWithProviders } from '../../../utils/test-utils';
import {
  useGetAllUsersQuery, useDeleteUserMutation, useUpdateUserMutation
} from '../../../services/api/apiService';

jest.mock('../../../services/api/apiService', () => ({
  useGetAllUsersQuery: jest.fn(),
  useDeleteUserMutation: jest.fn(),
  useUpdateUserMutation: jest.fn(),
}));

describe('Users Screen', () => {
  beforeEach(() => {
    useGetAllUsersQuery.mockImplementation(() => ({}))
    useDeleteUserMutation.mockImplementation(() => ({}))
  });

  it('should fetch the users data by calling the hook useGetAllUsersQuery', () => {
    renderWithProviders(<Users />);
    expect(useGetAllUsersQuery).toHaveBeenCalled();
  });

  describe('while loading', () => {
    it('should render "Loading..."', () => {
      useGetAllUsersQuery.mockImplementation(() => ({
        isLoading: true,
      }));

      const { getByText } = renderWithProviders(<Users />);

      const loaderElement = getByText(/loading/i);
      expect(loaderElement).toBeInTheDocument();
    })
  })

  describe('if there is an error', () => {
    it('should render an error message', () => {
      useGetAllUsersQuery.mockImplementation(() => ({
        isError: true,
        error: { error: 'TypeError: Failed to fetch' },
      }));

      const { getByText } = renderWithProviders(<Users />);

      const errorElement = getByText(/TypeError: Failed to fetch/i);
      expect(errorElement).toBeInTheDocument();
    })
  })

  describe('with data', () => {
    it.skip('renders correctly', async () => {
      const { baseElement } = renderWithProviders(<Users />);
      expect(baseElement).toMatchSnapshot();
    });

    it.skip('should render UsersTable and CreateUser components', () => {
      useGetAllUsersQuery.mockImplementation(() => ({
        users: usersList,
        data: usersList,
      }));

      const { getByText, getByRole } = renderWithProviders(<Users />);

      screen.debug();
      expect(getByText(/new user/i)).toBeInTheDocument();

      const usersTable = getByRole('table');
      const rowElement = getByText('John');
      expect(usersTable).toBeInTheDocument();
      expect(rowElement).toBeInTheDocument();
    })
  })
});