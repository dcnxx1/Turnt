import {PayloadAction, createSlice} from '@reduxjs/toolkit';
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
       
        state.isPlaying = payload.isPlaying;
        state.isActive = payload.isActive;
        (state.listIndex = payload.listIndex),
          (state.activeVideo = payload.activeVideo);
      } else {
        console.log('NOT initializing videoSliceHome!');
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
    builder.addCase(setListIndex, (state, {payload}: PayloadAction<number>) => {
      if (state.isActive) {
        state.listIndex = payload;
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
          console.log('setting active video to :>>', video_id, duration);
          state.activeVideo = {video_id, duration};
        } else {
          console.log('not active, aint gonna do shit');
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
