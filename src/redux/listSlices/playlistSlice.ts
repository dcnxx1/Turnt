import {createSlice} from '@reduxjs/toolkit';
import {initialState} from './homeSlice';
import * as actions from '../videoListSlice';
import {setPosition} from '../playlistSheetSlice';

const playlistSlice = createSlice({
  name: 'playlistSlice',
  initialState: initialState,
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
    builder.addCase(setPosition, (state, action) => {
      if (action.payload !== 'Hidden') {
        state.isPlaying = true;
        state.isActive = true;
      }
    });
  },
});

export const playlistSliceActions = playlistSlice.actions;

export default playlistSlice;
