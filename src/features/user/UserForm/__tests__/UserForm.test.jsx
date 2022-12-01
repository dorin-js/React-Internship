import React from 'react';
import {
  fireEvent, screen, waitFor,
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import UserForm from '../UserForm';
import { renderWithProviders } from '../../../../utils/test-utils';

describe('Render form', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('should render correctly', () => {
    const { baseElement } = renderWithProviders(<UserForm />);
    expect(baseElement).toMatchSnapshot();
  });

  it.skip('should handle correct input values', async () => {
    fetch.mockResponseOnce(JSON.stringify({
      items: [
        {
          _created: 1669709177.617638,
          _data_type: 'users',
          _is_deleted: false,
          _modified: 1669709177.617651,
          _self_link: 'https://crudapi.co.uk/api/v1/users/a9606a8e-3f3b-4eee-a3d7-124404dcffa5',
          _user: 'ca1db56c-83bf-4fca-b2e8-6c31fd33f6ff',
          _uuid: 'a9606a8e-3f3b-4eee-a3d7-124404dcffa5',
          birthDate: '2022-11-01',
          email: 'ilusca97@gmail.com',
          id: '',
          lastname: 'ILUSCA',
          firstname: 'DORIN',
        },
      ],
    }));

    act(() => renderWithProviders(
      <UserForm />,
    ));
    act(() => {
      fireEvent.change(screen.getByPlaceholderText('First Name'), { target: { value: 'DORIN' } });
      fireEvent.change(screen.getByPlaceholderText('Last Name'), { target: { value: 'ILUSCA' } });
      fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'ilusca97@gmail.com' } });
      fireEvent.change(screen.getByPlaceholderText('Date of birth'), { target: { value: '2022-11-012' } });
    });

    fireEvent.click(screen.getByRole('button', { name: /create user/i }));

    // await waitFor(() => {
    //   expect(fetch).toHaveBeenCalledWith({
    //     birth: '2022-11-01',
    //     email: 'ilusca97@gmail.com',
    //     id: '',
    //     lastname: 'ILUSCA',
    //     name: 'DORIN',
    //   });
    // });
  });
});

describe('UserForm validation', () => {
  beforeEach(async () => {
    await act(async () => {
      renderWithProviders(<UserForm />);
    });
  });

  it('should display required error when inputs are blank', async () => {
    fetch.mockRejectOnce(() => ({ data: '' }));

    await act(async () => {
      fireEvent.submit(screen.getByRole('button', { name: /create user/i }));
    });

    expect(await screen.findAllByRole('alert')).toHaveLength(4);
    expect(fetch).not.toBeCalled();
  });

  it('should display matching error when email is invalid', async () => {
    await act(() => {
      fireEvent.input(screen.getByPlaceholderText('First Name'), {
        target: {
          value: 'Test',
        },
      });
    });
    await act(() => {
      fireEvent.input(screen.getByPlaceholderText('Last Name'), {
        target: {
          value: 'Name',
        },
      });
    });
    await act(() => {
      fireEvent.input(screen.getByPlaceholderText('Email'), {
        target: {
          value: 'myemail',
        },
      });
    });
    await act(() => {
      fireEvent.input(screen.getByPlaceholderText('Date of birth'), {
        target: {
          value: '2022-11-01',
        },
      });
    });

    await act(() => {
      fireEvent.submit(screen.getByRole('button', { name: /create user/i }));
    });

    expect(await screen.findAllByRole('alert')).toHaveLength(1);
    expect(screen.getByPlaceholderText('Email').value).toBe('myemail');
    expect(screen.getByPlaceholderText('First Name').value).toBe('Test');
  });

  it('should display matching error when name is invalid', async () => {
    fireEvent.input(screen.getByPlaceholderText('First Name'), {
      target: {
        value: 'Test123',
      },
    });
    fireEvent.input(screen.getByPlaceholderText('Last Name'), {
      target: {
        value: 'Name123',
      },
    });
    fireEvent.input(screen.getByPlaceholderText('Email'), {
      target: {
        value: 'myemail@gmail.com',
      },
    });
    fireEvent.input(screen.getByPlaceholderText('Date of birth'), {
      target: {
        value: '2022-11-01',
      },
    });

    fireEvent.submit(screen.getByRole('button', { name: /create user/i }));

    expect(await screen.findAllByRole('alert')).toHaveLength(2);
    expect(screen.getByPlaceholderText('First Name').value).toBe('Test123');
    expect(screen.getByPlaceholderText('Last Name').value).toBe('Name123');
  });

  it('should not display any errors on valid inputs', async () => {
    fetch.mockRejectOnce(() => ({ data: 'ok' }));
    fireEvent.input(screen.getByPlaceholderText('First Name'), {
      target: {
        value: 'John',
      },
    });
    fireEvent.input(screen.getByPlaceholderText('Last Name'), {
      target: {
        value: 'Doe',
      },
    });
    fireEvent.input(screen.getByPlaceholderText('Email'), {
      target: {
        value: 'johndoe@mail.co',
      },
    });
    fireEvent.input(screen.getByPlaceholderText('Date of birth'), {
      target: {
        value: '1999-11-01',
      },
    });

    fireEvent.submit(screen.getByRole('button', { name: /create user/i }));

    await waitFor(() => expect(screen.queryAllByRole('alert')).toHaveLength(0));
    expect(fetch).toBeCalledTimes(1);
  });
});
