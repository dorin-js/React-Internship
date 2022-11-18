import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import UserForm from '../UserForm';

const mockPostUser = jest.fn();
jest.mock('../../../../common/services/usersApi', () => jest.fn().mockImplementation(() => ({ postUser: mockPostUser })));

describe('Render form', () => {
  it.skip('should render correctly', () => {
    const { baseElement } = render(<UserForm onCreateUser={mockPostUser} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('creates new user', async () => {
    // const mockSubmit = jest.fn();
    const onCreateUser = (items) => {
      console.log(items);
    };
    const {
      getByPlaceholderText, getByTestId,
    } = render(<UserForm onCreateUser={onCreateUser} />);

    fireEvent.change(getByPlaceholderText('First Name'), { target: { value: 'Test' } });
    fireEvent.change(getByPlaceholderText('Last Name'), { target: { value: 'Test1' } });
    fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'test@mail.co' } });
    fireEvent.change(getByPlaceholderText('Date of birth'), { target: { value: '27-10-2001' } });

    fireEvent.click(getByTestId('submit-button'));
    await waitFor(async () => {
      expect(mockPostUser).toHaveBeenCalled();
    });
  });
});
