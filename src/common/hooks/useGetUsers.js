import { useState, useCallback } from 'react';
import { usersApi } from '../services/usersApi';

const useGetUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async () => {
    setLoading(true);
    try {
      const { items } = await usersApi.getAllUsers();
      setUsers(items);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  }, [usersApi]);

  return [execute, setUsers, { users, loading, error }];
};

export default useGetUsers;
