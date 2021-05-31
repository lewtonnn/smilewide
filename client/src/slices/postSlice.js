import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  post: {},
  posts: [],
  status: 'loading',
};

export const getPosts = createAsyncThunk('post/getPosts', async () => {
  const posts = await axios.get('/API/v1/posts');
  return posts.data.payload;
});

export const likePost = createAsyncThunk('post/likePost', async (payload) => {
  const postLikes = await axios.post(`/API/v1/posts/${payload.postId}/like`);
  return postLikes.data.payload;
});

const postSlice = createSlice({
  name: 'post',
  initialState,
  extraReducers: builder => {
    builder
        .addCase(getPosts.fulfilled, (state, action) => {
          state.posts = action.payload;
          state.status = 'idle';
        });
    builder
        .addCase(likePost.fulfilled, (state, action) => {
          state.posts.forEach((post) => {
            if (post._id.toString() === action.payload._id) {
              post.likes = action.payload.likes;
            }
          });
          state.status = 'idle';
        });
  },
});

export default postSlice.reducer;
