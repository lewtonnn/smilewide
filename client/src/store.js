import { configureStore } from '@reduxjs/toolkit';
import postReducer from './slices/postSlice';
import userSlice from './slices/userSlice';
import modalSlice from './slices/modalSlice';

export const store = configureStore({
  reducer: {
    post: postReducer,
    user: userSlice,
    modal: modalSlice,
  },
});
