/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import classes from './UsersTable.module.css';
import { Modal } from '../../../common/components/Modal';
import UserRow from './UserRow';
import { getUserDetails, setDetails } from '../usersSlice';

const UsersTable = ({ users }) => {
  const details = useSelector(getUserDetails);
  const dispatch = useDispatch();

  const onUserDetails = (userData) => {
    dispatch(setDetails(userData));
  };
  return (
    <main className={classes.main}>
      <table className={`${classes.usersTable} ${classes.hscroll}`}>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Birth Date</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              onUserDetails={onUserDetails}
            />
          ))}
        </tbody>
      </table>

      {details && (
        <Modal onClose={() => onUserDetails(null)}>
          <h5>{details.firstname}</h5>
          <h5>{details.lastname}</h5>
          <h5>{details.email}</h5>
          <h5>{details.birthDate}</h5>
        </Modal>
      )}
    </main>
  );
};

UsersTable.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    lastname: PropTypes.string,
    email: PropTypes.string,
    birth: PropTypes.string,
  })),
};
UsersTable.defaultProps = {
  users: undefined,
};

export default UsersTable;
