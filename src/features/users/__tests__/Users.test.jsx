import React from 'react';
import {
  screen, baseElement,
} from '@testing-library/react';
import Users from '../Users';
import { usersList } from '../__fixtures__/userList';
import { renderWithProviders } from '../../../utils/test-utils';

describe('Users Screen', () => {
  it('renders correctly', async () => {
    fetch.mockResponse(JSON.stringify({
      items: usersList,
    }));
    const { findByRole } = renderWithProviders(<Users />);
    await findByRole('table');

    expect(baseElement).toMatchSnapshot();
  });

  it('should render "Loading..."', async () => {
    fetch.mockResponseOnce(JSON.stringify({
      items: usersList,
    }));
    const { getByText, findByRole } = renderWithProviders(<Users />);

    const loaderElement = getByText(/loading/i);
    expect(loaderElement).toBeInTheDocument();

    await findByRole('table');
    expect(loaderElement).not.toBeInTheDocument();
  });

  it('should render an error message', async () => {
    fetch.mockRejectOnce(JSON.stringify('Bad request, unable to fetch data!'));

    const { findByText, getByText } = renderWithProviders(<Users />);

    await findByText(/error/i);
    const errorMessage = getByText(/Bad request, unable to fetch data!/i);
    screen.debug();
    expect(errorMessage).toBeInTheDocument();
  });

  it('should render UsersTable and CreateUser components', async () => {
    fetch.mockResponseOnce(JSON.stringify({
      items: usersList,
    }));

    const { getByText, findByRole } = renderWithProviders(<Users />);

    const usersTable = await findByRole('table');
    expect(usersTable).toBeInTheDocument();

    const rowElement = getByText('John');
    expect(rowElement).toBeInTheDocument();
  });
});
