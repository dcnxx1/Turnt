import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {ITurn} from '../models/turn';

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
    setActiveTurn: (_, {payload}: PayloadAction<ITurn>) => {},
  },
});

export const {
  increment,
  decrement,
  setIndex,
  setIsPlaying,
  togglePlaying,
  setActiveSlice,
  setActiveTurn,
} = videoListSlice.actions;

export default videoListSlice;
