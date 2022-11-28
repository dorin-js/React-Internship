import React from 'react';
import {
  act, fireEvent, render, waitFor, screen,
} from '@testing-library/react';
import Users from '../Users';
import { usersList } from '../__fixtures__/userList';
import { renderWithProviders } from '../../../utils/test-utils';
import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useCreateNewUserMutation
} from '../../../services/api/apiService';

jest.mock('../../../services/api/apiService', () => ({
  useGetAllUsersQuery: jest.fn(),
  useDeleteUserMutation: jest.fn(),
  useUpdateUserMutation: jest.fn(),
  useCreateNewUserMutation: jest.fn(),
}));


describe('Users Screen', () => {
  beforeEach(() => {
    useGetAllUsersQuery.mockImplementation(() => ({}));
    useDeleteUserMutation.mockImplementation(() => ([]));;
    useCreateNewUserMutation.mockImplementation(() => ([]));
    useUpdateUserMutation.mockImplementation(() => ([]))
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
    beforeEach(() => {
      const createNewUser = jest.fn();
      const updateUser = jest.fn();
      const deleteUser = jest.fn();
      useUpdateUserMutation.mockImplementation(() => ([
        updateUser,
        { isLoading: false, isError: false, error: null }
      ]));
      useDeleteUserMutation.mockImplementation(() => ([
        deleteUser,
        { isLoading: false, isError: false, error: null }
      ]));
      useCreateNewUserMutation.mockImplementation(() => ([
        createNewUser,
        { isSucces: true, isLoading: false, isError: false, error: null }
      ]));
    })

    it('renders correctly', async () => {
      const { baseElement } = renderWithProviders(<Users />);
      expect(baseElement).toMatchSnapshot();
    });

    it('should render UsersTable and CreateUser components', () => {
      useGetAllUsersQuery.mockImplementation(() => ({
        data: usersList,
      }));

      const { getByText, getByRole } = renderWithProviders(<Users />);
      screen.debug();
      const usersTable = getByRole('table');
      const rowElement = getByText('John');
      expect(usersTable).toBeInTheDocument();
      expect(rowElement).toBeInTheDocument();
    });
  })
});