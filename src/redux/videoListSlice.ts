import {PayloadAction, createSlice} from '@reduxjs/toolkit';

const videoListSlice = createSlice({
  name: 'videoListSlice',
  initialState: {},
  reducers: {
    increment: (state) => {},
    decrement: () => {},
    setIsPlaying: (state, {payload}: PayloadAction<boolean>) => {},
    togglePlaying: () => {},
    setActiveSlice: () => {},
  },
});

export const {
  increment,
  decrement,
  setIsPlaying,
  togglePlaying,
  setActiveSlice,
} = videoListSlice.actions;

export default videoListSlice;
