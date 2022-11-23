/* eslint-disable class-methods-use-this */
export const mockPostUser = jest.fn().mockRejectedValue();
export const getAllUsers = jest.fn().mockRejectedValue();
export const getUserById = jest.fn().mockRejectedValue();
export const deleteUserById = jest.fn().mockRejectedValue();

export class MockUsersApi {
  postUser(body) {
    return mockPostUser(body);
  }

  getAllUsers() {
    return getAllUsers();
  }

  getUserById(id) {
    return getUserById(id);
  }

  deleteUserById(id) {
    return deleteUserById(id);
  }
}

export const usersApi = new MockUsersApi();
