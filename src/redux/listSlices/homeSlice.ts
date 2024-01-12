import {createSlice} from '@reduxjs/toolkit';
import * as actions from '../videoListSlice';
import * as playlistSheetActions from '../playlistSheetSlice';

export const initialState = {
  index: 0,
  isPlaying: false,
  isActive: false,
};

const homeSlice = createSlice({
  name: 'homeSlice',
  initialState: {
    index: 0,
    isPlaying: false,
    isActive: true,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(actions.increment, (state, action) => {
      if (state.isActive) {
        state.index++;
      }
    });
    builder.addCase(actions.decrement, state => {
      if (state.isActive) {
        state.index--;
      }
    });
    builder.addCase(actions.setIndex, (state, action) => {
      if (state.isActive) {
        state.index = action.payload;
      }
    });
    builder.addCase(actions.togglePlaying, state => {
      if (state.isActive) {
        state.isPlaying = !state.isPlaying;
      }
    });
    builder.addCase(actions.setIsPlaying, (state, action) => {
      if (state.isActive) {
        state.isPlaying = action.payload;
      }
    });
    builder.addCase(playlistSheetActions.setPosition, (state, action) => {
      if (action.payload !== 'Hidden') {
        state.isPlaying = false
        state.isActive = false;
      }
    });
  },
});

export const homeSliceActions = homeSlice.actions;

export default homeSlice;
