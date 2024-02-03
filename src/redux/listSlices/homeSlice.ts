import {createSlice} from '@reduxjs/toolkit';
import {setActiveSlice, setActiveTurn, setIndex} from '../videoListSlice';
import {useActiveTurnStore} from '../../store';

export const initialState = {};

const homeSlice = createSlice({
  name: 'videoListSliceHome',
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
    builder.addCase(setActiveTurn, (state, action) => {
      if (state.isSliceActive) {
        state.title = action.payload.turn_id;
      }
    });
    builder.addCase(setActiveSlice, (state, payload) => {
        if (payload.payload === 'playlistSlice') {
          state.isSliceActive = false;
        } else {
          state.isSliceActive = true;
        }
      
    });
  },
});

export const homeSliceActions = homeSlice.actions;

export default homeSlice;
