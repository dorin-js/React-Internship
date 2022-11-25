import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import store from './app/store';
import Users from './features/users/Users';

const App = () => (
  <Provider store={store}>
    <div className="App">
      <Users />
    </div>
  </Provider>
);

export default App;
