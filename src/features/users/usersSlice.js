import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  details: null,
};

export const usersSlice = createSlice({
  initialState,
  name: 'users',
  reducers: {
    setDetails: (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.details = payload;
    },
  },
});

export const getUserDetails = (state) => state.users.details;

export const { setDetails } = usersSlice.actions;
export default usersSlice.reducer;
