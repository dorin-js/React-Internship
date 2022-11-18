import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders users list heading', () => {
  render(<App />);
  const titleElement = screen.getByText(/users list/i);
  expect(titleElement).toBeInTheDocument();
});
