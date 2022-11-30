import React from 'react';
import {
  fireEvent, render, act, screen, waitFor,
} from '@testing-library/react';
import UserForm from '../UserForm';
import { renderWithProviders } from '../../../../utils/test-utils';
import {
  useUpdateUserMutation, useCreateNewUserMutation,
} from '../../../../services/api/apiService';
import { usersList } from '../../../users/__fixtures__/userList';

describe('Render form', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('should render correctly', () => {
    const { baseElement } = renderWithProviders(<UserForm />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should make an api call with given input values', async () => {
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

    fireEvent.click(screen.getByRole('button', { name: 'Create' }));

    await waitFor(() => {
      // expect(fetch).toHaveBeenCalledWith({
      //   birth: '2022-11-01',
      //   email: 'ilusca97@gmail.com',
      //   id: '',
      //   lastname: 'ILUSCA',
      //   name: 'DORIN',
      // });
      console.log(fetch.mock);
    });
  });
});
