import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateUser from './CreateUser';
import { Modal } from '../../common/components/Modal';
import { UsersTable, UserRow } from './UsersTable';
import { useGetAllUsersQuery } from '../../services/api/apiService';
import { getUserDetails, setDetails } from './usersSlice';

const Users = () => {
  const details = useSelector(getUserDetails);
  const dispatch = useDispatch();
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllUsersQuery();

  const onUserDetails = (userData) => {
    dispatch(setDetails(userData));
  };

  let content;

  if (isLoading) {
    content = <h3>Loading...</h3>;
  }

  if (isSuccess) {
    content = (
      <>
        <CreateUser />
        <UsersTable>
          {users.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              onUserDetails={onUserDetails}
            />
          ))}
        </UsersTable>
      </>
    );
  }

  if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return (
    <>
      <h2 className="title">Users List</h2>
      {content}
      {details && (
        <Modal onClose={() => onUserDetails(null)}>
          <h5>{details.name}</h5>
          <h5>{details.lastname}</h5>
          <h5>{details.email}</h5>
          <h5>{details.birth}</h5>
        </Modal>
      )}
    </>
  );
};

export default Users;
