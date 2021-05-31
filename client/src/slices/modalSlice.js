import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loginModalOpen: false,
  postModalOpen: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggleLoginModalOpen(state) {
      state.loginModalOpen = !state.loginModalOpen;
    },
    togglePostModalOpen(state) {
      state.postModalOpen = !state.postModalOpen;
    },
    closeAllModals(state) {
      state.loginModalOpen = false;
      state.postModalOpen = false;
    },
  },
});

export const { toggleLoginModalOpen, togglePostModalOpen, closeAllModals } = modalSlice.actions;
export default modalSlice.reducer;
