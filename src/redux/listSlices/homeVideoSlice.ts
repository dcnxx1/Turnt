import {createSlice} from '@reduxjs/toolkit';
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
import {VideoSlice} from './videoSliceTypes';
export const initialState = {
  isActive: false,
  isPlaying: false,
  listIndex: 0,
  activeVideo: {
    video_id: '',
    duration: 0,
  },
};

const homeSlice = createSlice({
  name: VideoSlice.HomeSlice,
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(initializeSlice, (state, {payload}) => {
      if (payload.initializeSlice === VideoSlice.HomeSlice) {
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
    builder.addCase(setIsPlayingVideo, (state, {payload: {isPlaying}}) => {
      if (state.isActive) {
        state.isPlaying = isPlaying;
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
    builder.addCase(disableAllSlices, state => {
      state.isActive = false;
    });
  },
});

export const homeSliceActions = homeSlice.actions;

export default homeSlice;
