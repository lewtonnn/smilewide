import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import setAuthHeader from '../helpers/setAuthHeader';

const initialState = {
  me: {},
  isAuthenticated: false,
  users: {},
  status: 'loading',
};

export const loginUser = createAsyncThunk('user/loginUser',
    async (payload, thunkApi) => {
      const { email, password } = payload;
      const token = await axios.post('/API/v1/users/login', {
        email,
        password,
      });
      if (token && token.data && token.data.token) {
        document.cookie =
            `token=${token.data.token};max-age=604800`;
        setAuthHeader(token.data.token);
        thunkApi.dispatch(loadSelf());
      }
    });

export const loadSelf = createAsyncThunk('user/loadSelf', async () => {
  const self = await axios.get('/API/v1/users/me');
  return self.data.payload;
});

export const getUser = createAsyncThunk('user/loadUser', async (payload) => {
  const { userId } = payload;
  const user = await axios.post(`/API/v1/users/${userId}`);
  return user.data.payload;
});

const postSlice = createSlice({
  name: 'post',
  initialState,
  extraReducers: {
    [loginUser.fulfilled]: (state) => {
      state.status = 'idle';
      state.isAuthenticated = true;
    },
    [getUser.fulfilled]: (state, action) => {
      state.status = 'idle';
    },
    [loadSelf.fulfilled]: (state, action) => {
      state.me = action.payload;
      state.isAuthenticated = true;
      state.status = 'idle';
    },
  },
});

export default postSlice.reducer;
