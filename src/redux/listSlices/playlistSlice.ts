import {createSlice} from '@reduxjs/toolkit';
import {setNewPosition, setPosition} from '../playlistSheetSlice';
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
        console.log('isActiveLSice :>>', state.isActive);
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

    builder.addCase(actions.setActiveSlice, (state, payload) => {
      console.log('setActiveSLice hit :>');
      if (payload.payload === 'playlistSlice') {
        (state.isActive = true), (state.isPlaying = true);
        console.log('activatingPlaylistSlice :>>', state.isActive);
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
      if (state.isActive) {
        if (state.activeVideoId !== payload.turn_id) {
          state.activeVideoId = payload.turn_id;
          state.duration = payload.duration;
        }
      }
    });
    builder.addCase(setNewPosition, (state, action) => {
      if (state.isActive) {
        state.index = action.payload.scrollToIndex;
      }
    });
    builder.addCase(actions.disableSlices, (state, action) => {
      state.isActive = false;
      state.isPlaying = false
    });
  },
});

export const playlistSliceActions = playlistSlice.actions;

export default playlistSlice;
