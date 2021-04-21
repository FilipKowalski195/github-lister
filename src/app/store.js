import { configureStore } from '@reduxjs/toolkit';
import repositoriesReducer from '../features/repositories/repositoriesSlice';

export const store = configureStore({
  reducer: {
    repositories: repositoriesReducer,
  },
});
