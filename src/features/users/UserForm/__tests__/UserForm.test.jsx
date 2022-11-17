import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import UserForm from '../UserForm';

jest.mock('../../../../common/services/usersApi');

describe('Render form', () => {
  const mockSubmit = jest.fn();

  it.skip('should render correctly', () => {
    const { baseElement, debug } = render(<UserForm onCreateUser={mockSubmit} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('creates new user', async () => {
    const {
      getByPlaceholderText, getByTestId,
    } = render(<UserForm onCreateUser={mockSubmit} />);

    console.log(jest.fn());

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
