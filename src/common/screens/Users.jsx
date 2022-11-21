/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState, useCallback } from 'react';
import Error from '../components/Error';
import CreateUser from './CreateUser';
import { UsersTable, UserRow } from '../../features/users/UsersTable';
import Portal from '../components/Portal';
import { Modal } from '../components/Modal';
import { usersApi } from '../services/usersApi/usersApi';
import useGetUsers from '../hooks/useGetUsers';

const Users = () => {
  const [execute, setUsers, { users, loading, error }] = useGetUsers();
  const [details, setDetails] = useState();

  useEffect(() => {
    execute();
    console.log(users);
  }, [execute]);

  const onDoneDelete = (id) => {
    setUsers((prevUsers) => [...prevUsers].filter((user) => user._uuid !== id));
  };

  const onDoneCreate = (items) => {
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
      <CreateUser onDoneCreate={onDoneCreate} />
      <UsersTable>
        {users.map((user) => (
          <UserRow
            // eslint-disable-next-line no-underscore-dangle
            key={user._uuid}
            user={user}
            onDoneDelete={onDoneDelete}
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
