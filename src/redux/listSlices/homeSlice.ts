import {createSlice} from '@reduxjs/toolkit';
import {ITurn} from '../../models/turn';
import * as actions from '../videoListSlice';

export const initialState = {
  index: 0,
  isPlaying: false,
  isActive: false,
  activeTurn: {} as ITurn,
  activeVideoId: '' as ITurn['turn_id'],
  duration: 0 as ITurn['duration'],
};

const homeSlice = createSlice({
  name: 'homeSlice',
  initialState: {
    index: 0,
    isPlaying: false,
    isActive: true,
    activeTurn: {} as ITurn,
    activeVideoId: '' as ITurn['turn_id'],
    duration: 0 as ITurn['duration'],
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
        console.log("SetIndex called")
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
    builder.addCase(actions.setActiveSlice, (state, payload) => {
      if (payload.payload === 'homeSlice') {
        state.isActive = true;
        state.isPlaying = true;
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
      state.activeVideoId = payload.turn_id;
      state.duration = payload.duration;
    });
    builder.addCase(actions.disableSlices, (state, action) => {
      if (state.isActive) {
        state.isActive = false;
      }
    });
  },
});

export const homeSliceActions = homeSlice.actions;

export default homeSlice;
