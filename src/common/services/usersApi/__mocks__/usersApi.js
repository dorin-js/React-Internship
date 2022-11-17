export const mockPostUser = jest.fn().mockResolvedValue({
  _uuid: 'mock-uuid',
  firstName: 'john doe',
});

export const usersApi = {
  postUser: () => mockPostUser,
};
