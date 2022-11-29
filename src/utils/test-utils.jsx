import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { PropTypes } from 'prop-types';
import { setupStore } from '../app/store';

export const renderWithProviders = (
  ui,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
  } = {},
) => {
  const Wrapper = ({ children }) => (
    <div id="portal-root">
      <Provider store={store}>{children}</Provider>
    </div>
  );

  Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return { store, ...render(ui, { wrapper: Wrapper }) };
};
