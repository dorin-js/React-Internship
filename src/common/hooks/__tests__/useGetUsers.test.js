import { renderHook, act, waitFor } from '@testing-library/react';
import useGetUsers from '../useGetUsers';
import * as mockUserApi from '../../services/usersApi/usersApi';
import { usersList } from '../__fixtures__/userList';

describe('useGetUsers hook', () => {
  // it('should call users api client', async () => {
  //   const { result } = renderHook(useGetUsers);
  //   const execute = result.current[0];
  //   await act(async () => {
  //     await execute();
  //   });
  //   await waitFor(async () => {
  //     expect(mockUserApi.getAllUsers).toHaveBeenCalled();
  //   });
  // });

  it('should set list of users', async () => {
    mockUserApi.getAllUsers.mockResolvedValue(usersList);
    const { result } = renderHook(useGetUsers);
    await act(async () => {
      const execute = result.current[0];
      await execute();
      expect(mockUserApi.getAllUsers).toHaveBeenCalled();
      expect(result.current[2].users).toEqual(2);
    });
    // await waitFor(async () => {
    // });
  });
});
