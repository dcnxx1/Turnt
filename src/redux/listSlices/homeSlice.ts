import {PayloadAction, createAction, createSlice} from '@reduxjs/toolkit';
import * as actions from '../videoListSlice';

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
    builder.addCase(actions.setActiveSlice, (state, action) => {
      state.isActive = !state.isActive;
    });
  },
});

export const homeSliceActions = homeSlice.actions;

export default homeSlice;
