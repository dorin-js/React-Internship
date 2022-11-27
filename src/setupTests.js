import React from 'react';
import '@testing-library/jest-dom';
import fetchMock, { enableFetchMocks } from 'jest-fetch-mock';
import { Provider } from 'react-redux';
import { setupStore } from './app/store';

enableFetchMocks();

// jest.mock('./common/services/usersApi/usersApi');

// global.wrapper = ({ children }) => {
//   const store = setupStore();
//   return <Provider store={store}>{children}</Provider>;
// };
