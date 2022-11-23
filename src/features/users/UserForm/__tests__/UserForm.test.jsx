import React from 'react';
import { fireEvent, render, act } from '@testing-library/react';
import UserForm from '../UserForm';
import * as mockUserApi from '../../../../common/services/usersApi/usersApi';

describe('Render form', () => {
  it('should render correctly', () => {
    const { baseElement } = render(<UserForm onCreateUser={mockUserApi.mockPostUser} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should make an api call to create new user with given input values', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <UserForm onCreateUser={mockUserApi.mockPostUser} />,
    );
    act(() => {
      fireEvent.change(getByPlaceholderText('First Name'), { target: { value: 'Test' } });
      fireEvent.change(getByPlaceholderText('Last Name'), { target: { value: 'Test1' } });
      fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'test@mail.co' } });
      fireEvent.change(getByPlaceholderText('Date of birth'), { target: { value: '2020-05-12' } });
    });

    await act(async () => {
      fireEvent.click(getByTestId('submit-button'));
    });

    expect(mockUserApi.mockPostUser).toHaveBeenCalledWith({
      name: 'Test',
      lastname: 'Test1',
      email: 'test@mail.co',
      birth: '2020-05-12',
    });
  });
});
