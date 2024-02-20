import {createSlice} from '@reduxjs/toolkit';
import {initialState} from './homeVideoSlice';
import {VideoSlice} from './videoSliceTypes';
import {
  decrementListIndex,
  disableAllSlices,
  incrementListIndex,
  initializeSlice,
  setActiveVideo,
  setIsPlayingVideo,
  setListIndex,
  toggleVideoIsPlaying,
} from './videoManagementSlice';

const playlistSlice = createSlice({
  name: VideoSlice.PlaylistSlice,
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(initializeSlice, (state, {payload}) => {
      console.log("payload :>>", payload)
      if (payload.initializeSlice === VideoSlice.PlaylistSlice) {
        state = payload;
      } else {
        state.isActive = false;
      }
    });
    builder.addCase(incrementListIndex, state => {
      if (state.isActive) {
        state.listIndex++;
      }
    });
    builder.addCase(decrementListIndex, state => {
      if (state.isActive) {
        state.listIndex--;
      }
    });
    builder.addCase(setListIndex, (state, {payload: {index}}) => {
      if (state.isActive) {
        state.listIndex = index;
      }
    });
    builder.addCase(toggleVideoIsPlaying, state => {
      if (state.isActive) {
        state.isPlaying = !state.isPlaying;
      }
    });
    builder.addCase(
      setActiveVideo,
      (state, {payload: {video_id, duration}}) => {
        if (state.isActive) {
          state.activeVideo = {video_id, duration};
        }
      },
    );
    builder.addCase(setIsPlayingVideo, (state, {payload: {isPlaying}}) => {
      if (state.isActive) {
        state.isPlaying = isPlaying;
      }
    });
    builder.addCase(disableAllSlices, state => {
      state.isActive = false;
    });
  },
});

export const playlistSliceActions = playlistSlice.actions;

export default playlistSlice;
