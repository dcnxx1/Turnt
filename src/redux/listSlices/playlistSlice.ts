import {createSlice} from '@reduxjs/toolkit';
import playlistSheetSlice, {
  setPosition,
  setNewPosition,
} from '../playlistSheetSlice';
import * as actions from '../videoListSlice';
import {initialState} from './homeSlice';

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
        if (state.isActive === false) {
          (state.isActive = true), (state.isPlaying = true);
        }
      }
    });
    builder.addCase(actions.setActiveSlice, (state, payload) => {
      if (payload.payload === 'playlistSlice') {
        (state.isActive = true), (state.isPlaying = true);
      } else {
        state.isActive = false;
        state.isPlaying = false;
      }
    });
    builder.addCase(actions.setActiveTurn, (state, action) => {
      if (state.isActive) {
        state.activeTurn = action.payload;
      }
    });
    builder.addCase(actions.setActiveVideo, (state, {payload}) => {
      if (state.activeVideoId !== payload.turn_id) {
        state.activeVideoId = payload.turn_id;
        state.duration = payload.duration;
      }
    });
    builder.addCase(setNewPosition, (state, action) => {
      if (state.isActive) {
        state.index = action.payload.scrollToIndex;
      }
    });
  },
});

export const playlistSliceActions = playlistSlice.actions;

export default playlistSlice;
