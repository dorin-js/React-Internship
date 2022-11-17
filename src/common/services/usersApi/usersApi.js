import { BASE_URL, HEADERS } from '../constants';

class UsersApi {
  constructor() {
    this.http = async (endpoint, options = {}) => {
      const response = await fetch(endpoint, {
        ...options,
        headers: HEADERS,
      });

      return response.json();
    };
  }

  getAllUsers() {
    return this.http(`${BASE_URL}/users`, {
      method: 'GET',
    });
  }

  getUserById(id) {
    return this.http(`${BASE_URL}/users${id}`, {
      method: 'GET',
    });
  }

  postUser(body) {
    return this.http(`${BASE_URL}/users`, {
      method: 'POST',
      body: JSON.stringify([body]),
    });
  }

  deleteUserById(id) {
    return this.http(`${BASE_URL}/users/${id}`, {
      method: 'DELETE',
    });
  }
}

export const usersApi = new UsersApi();
