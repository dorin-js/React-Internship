import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import UserForm from '../UserForm';

const mockPostUser = jest.fn();
jest.mock('../../../../common/services/usersApi', () => jest.fn().mockImplementation(
  () => ({ postUser: mockPostUser }),
));

describe.skip('Render form', () => {
  it.skip('should render correctly', () => {
    const mockSubmit = jest.fn();
    const { baseElement } = render(<UserForm onCreateUser={mockSubmit} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('creates new user', async () => {
    const mockSubmit = jest.fn();
    const {
      getByPlaceholderText, getByTestId,
    } = render(<UserForm onCreateUser={mockSubmit} />);

    fireEvent.change(getByPlaceholderText('First Name'), { target: { value: 'Test' } });
    fireEvent.change(getByPlaceholderText('Last Name'), { target: { value: 'Test1' } });
    fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'test@mail.co' } });
    fireEvent.change(getByPlaceholderText('Date of birth'), { target: { value: '27-10-2001' } });

    fireEvent.click(getByTestId('submit-button'));
    await waitFor(async () => {
      expect(mockSubmit).toHaveBeenCalledWith({});
    });
  });
});
