import {createSlice} from '@reduxjs/toolkit';
import * as actions from '../videoListSlice';
import * as playlistSheetActions from '../playlistSheetSlice';
import {ITurn} from '../../models/turn';

export const initialState = {
  index: 0,
  isPlaying: false,
  isActive: false,
  activeTurn: {} as ITurn,
};

const homeSlice = createSlice({
  name: 'homeSlice',
  initialState: {
    index: 0,
    isPlaying: false,
    isActive: true,
    activeTurn: {} as ITurn,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(actions.increment, (state, action) => {
      if (state.isActive) {
        state.index++;
      }
    });
    builder.addCase(actions.decrement, state => {
      console.log(state.index);
      if (state.isActive && state.index > 0) {
        state.index--;
      }
    });
    builder.addCase(actions.setIndex, (state, action) => {
      if (state.isActive) {
        console.log('setIndex called home');
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
    //  TODO: check first if its active. could cause bugs
    builder.addCase(playlistSheetActions.setPosition, (state, action) => {
      if (action.payload === 'Hidden') {
        state.isPlaying = true;
        state.isActive = true;
      } else {
        (state.isPlaying = false), (state.isActive = false);
      }
    });
    builder.addCase(actions.setActiveTurn, (state, action) => {
      if (state.isActive) {
        state.activeTurn = action.payload;
      }
    });
  },
});

export const homeSliceActions = homeSlice.actions;

export default homeSlice;
