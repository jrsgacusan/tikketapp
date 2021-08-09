import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
};

const dataSlice = createSlice({
  name: 'data',
  initialState: initialState,
  reducers: {
    setData(state, action) {
      state.data = action.payload.data;
    },
    // showNotification(state, action) {
    //   state.notification = {
    //     status: action.payload.status,
    //     title: action.payload.title,
    //     message: action.payload.message,
    //   };
    // },
  },
});

export default dataSlice;

export const dataActions = dataSlice.actions;
