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
    setActiveSlice: (
      state,
      {payload}: PayloadAction<'playlistSlice' | 'homeSlice'>,
    ) => {},
    setActiveTurn: (_, {payload}: PayloadAction<ITurn>) => {},
    setActiveVideo: (
      _,
      {payload}: PayloadAction<Pick<ITurn, 'duration' | 'turn_id'>>,
    ) => {},
    disableSlices: _ => {},
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
  setActiveVideo,
  disableSlices
} = videoListSlice.actions;

export default videoListSlice;
