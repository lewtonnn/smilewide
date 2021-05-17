import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  post: {},
  posts: [],
  status: 'loading',
};

export const getPosts = createAsyncThunk('post/getPosts', async () => {
  return await axios.get('/API/v1/posts');
});

const postSlice = createSlice({
  name: 'post',
  initialState,
  extraReducers: builder => {
    builder
        .addCase(getPosts.fulfilled, (state, action) => {
          state.posts = action.payload.data.payload;
          state.status = 'idle';
        });
  },
});

export default postSlice.reducer;
