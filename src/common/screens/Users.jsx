/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState, useCallback } from 'react';
import { usersApi } from '../services/usersApi/usersApi';
import Error from '../components/Error';
import CreateUser from './CreateUser';
import { UsersTable, UserRow } from '../../features/users/UsersTable';
import Portal from '../components/Portal';
import { Modal } from '../components/Modal';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [details, setDetails] = useState();

  const getUsers = useCallback(async () => {
    setLoading(true);
    try {
      const { items } = await usersApi.getAllUsers();
      setUsers(items);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  }, [usersApi]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const onDeleteUser = (id) => {
    setUsers((prevUsers) => [...prevUsers].filter((user) => user._uuid !== id));
  };

  const onCreateUser = (items) => {
    setUsers((prevState) => [...items, ...prevState]);
  };

  const onUserDetails = (userData) => {
    setDetails(userData);
  };

  if (loading) {
    return <h3>Loading...</h3>;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <>
      <CreateUser onCreate={onCreateUser} />
      <UsersTable>
        {users.map((user) => (
          <UserRow
            // eslint-disable-next-line no-underscore-dangle
            key={user._uuid}
            user={user}
            onDelete={onDeleteUser}
            onUserDetails={onUserDetails}
          />
        ))}
      </UsersTable>
      {details && (
        <Portal>
          <Modal onClose={() => setDetails(null)}>
            <h5>{details.name}</h5>
            <h5>{details.lastname}</h5>
            <h5>{details.email}</h5>
            <h5>{details.birth}</h5>
          </Modal>
        </Portal>
      )}
    </>
  );
};

export default Users;
