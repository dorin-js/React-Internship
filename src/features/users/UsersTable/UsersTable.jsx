/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import classes from './UsersTable.module.css';

const UsersTable = ({ children }) => (
  <main className={classes.main}>
    <table className={classes.usersTable}>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Date of Birth</th>
        </tr>
      </thead>
      <tbody>
        {children}
      </tbody>
    </table>
  </main>
);

UsersTable.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UsersTable;
