import { configureStore } from '@reduxjs/toolkit';
import { apiService } from '../services/api/apiService';
import usersReducer from '../features/users/usersSlice';

export default configureStore({
  reducer: {
    users: usersReducer,
    [apiService.reducerPath]: apiService.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiService.middleware),
});
