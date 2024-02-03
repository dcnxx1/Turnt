import {createSlice} from '@reduxjs/toolkit';
import {setActiveSlice, setActiveVideo, setIndex} from '../videoListSlice';

const playlistSlice = createSlice({
  name: 'playlistSlice',
  initialState: {
    isSliceActive: true,
    currentListIndex: 0,
    title: '',
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(setIndex, (state, action) => {
      if (state.isSliceActive) {
        const index = action.payload;
        state.currentListIndex = index;
      }
    });
    builder.addCase(setActiveVideo, (state, action) => {
      if (state.isSliceActive) {
        state.title = action.payload.turn_id;
      }
    });
    builder.addCase(setActiveSlice, (state, payload) => {
      if (state.isSliceActive) {
        if (payload.payload === 'playlistSlice') {
          state.isSliceActive = true;
        } else {
          state.isSliceActive = false;
        }
      }
    });
  },
});

export const playlistSliceActions = playlistSlice.actions;

export default playlistSlice;
