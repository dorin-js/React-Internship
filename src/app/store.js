import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { apiService } from '../services/api/apiService';
import usersReducer from '../features/users/usersSlice';

// export default configureStore({
//   reducer: {
//     users: usersReducer,
//     [apiService.reducerPath]: apiService.reducer,
//   },
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiService.middleware),
// });

const rootReducer = combineReducers({
  users: usersReducer,
  [apiService.reducerPath]: apiService.reducer,
});

export const setupStore = (preloadedState) => configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiService.middleware),
  preloadedState,
});

const store = setupStore();

export default store;
