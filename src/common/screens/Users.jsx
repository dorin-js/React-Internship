/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import CreateUser from './CreateUser';
import Error from '../components/Error';
import Portal from '../components/Portal';
import { Modal } from '../components/Modal';
import useGetUsers from '../hooks/useGetUsers';
import { UsersTable, UserRow } from '../../features/users/UsersTable';

const Users = () => {
  const [execute, { users, loading, error }] = useGetUsers();
  const [details, setDetails] = useState();

  useEffect(() => {
    execute();
  }, [execute]);

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
      <CreateUser onDoneCreate={execute} />
      <UsersTable>
        {users.map((user) => (
          <UserRow
            // eslint-disable-next-line no-underscore-dangle
            key={user._uuid}
            user={user}
            onDoneDelete={execute}
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
