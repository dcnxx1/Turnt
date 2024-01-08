import {createSlice, configureStore} from '@reduxjs/toolkit';

const homeSlice = createSlice({
  name: 'homeSlice',
  initialState: {
    index: 0,
    isPlaying: false,
  },
  reducers: {
    increment: ({index}) => {
      index += 1;
    },
    decrement: ({index}) => {
      index -= 1;
    },
    togglePlay: ({isPlaying}) => {
      isPlaying = !isPlaying;
    },
    setIsPlaying: ({isPlaying}, {payload}) => {
      isPlaying = payload;
    },
  },
});

export const {increment, decrement} = homeSlice.actions;

export default homeSlice.reducer;
