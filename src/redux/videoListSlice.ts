import {PayloadAction, createSlice} from '@reduxjs/toolkit';

const videoListSlice = createSlice({
  name: 'videoListSlice',
  initialState: {},
  reducers: {
    increment: state => {},
    decrement: () => {},
    setIndex: (_, {payload}: PayloadAction<number>) => {},
    setIsPlaying: (state, {payload}: PayloadAction<boolean>) => {},
    togglePlaying: () => {},
    setActiveSlice: () => {},
  },
});

export const {
  increment,
  decrement,
  setIndex,
  setIsPlaying,
  togglePlaying,
  setActiveSlice,
} = videoListSlice.actions;

export default videoListSlice;
