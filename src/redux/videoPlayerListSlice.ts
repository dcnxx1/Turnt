import {createSlice, configureStore} from '@reduxjs/toolkit';

const videoPlayerListSlice = createSlice({
  name: 'videoPlayerList',
  initialState: {
    index: 0,
  },
  reducers: {
    increment: ({index}) => {
      index += 1;
    },
    decrement: ({index}) => {
      index -= 1;
    },
  },
});

export const {increment, decrement} = videoPlayerListSlice.actions;

const store = configureStore({
  reducer: videoPlayerListSlice.reducer,
});

store.dispatch(increment());
