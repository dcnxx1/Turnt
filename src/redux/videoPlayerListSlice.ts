import {createSlice, configureStore} from '@reduxjs/toolkit';

const videoPlayerListSlice = createSlice({
  name: 'videoPlayerList',
  initialState: {
    feedIndex: 0,
    playlistIndex: 0,
  },
  reducers: {
    increment: ({feedIndex, playlistIndex}) => {
      feedIndex += 1;
    },
    decrement: ({feedIndex}) => {
      feedIndex -= 1;
    },
  },
});

export const {increment, decrement} = videoPlayerListSlice.actions;

const store = configureStore({
  reducer: videoPlayerListSlice.reducer,
});

store.dispatch(increment());
