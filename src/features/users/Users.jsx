import React from 'react';
import CreateUser from '../user/CreateUser';
import { UsersTable } from './UsersTable';
import { useGetAllUsersQuery } from '../../services/api/apiService';
import Error from '../../common/components/Error';

const Users = () => {
  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useGetAllUsersQuery();

  if (isLoading) {
    return (<h3>Loading...</h3>);
  }

  if (isError) {
    return <Error errorMessage={error?.error || error?.data?.error} />;
  }

  return (
    <>
      <h2 className="title">Users List</h2>
      <CreateUser />
      <UsersTable users={users} />
    </>
  );
};

export default Users;
