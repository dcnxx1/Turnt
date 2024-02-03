import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {PayloadSetActiveVideo} from './videoSliceTypes';
import {
  PayloadSetListIndex,
  PayloadInitializeSlice,
  PayloadSetIsPlayingVideo,
} from './videoSliceTypes';

const videoManagementSlice = createSlice({
  name: 'videoManagementSlice',
  initialState: {},
  reducers: {
    initializeSlice: (
      _,
      {payload}: PayloadAction<PayloadInitializeSlice>,
    ) => {},
    incrementListIndex: () => {},
    decrementListIndex: () => {},
    setListIndex: (_, {payload}: PayloadAction<PayloadSetListIndex>) => {},
    toggleVideoIsPlaying: () => {},
    setIsPlayingVideo: (
      _,
      {payload}: PayloadAction<PayloadSetIsPlayingVideo>,
    ) => {},
    setActiveVideo: (_, {payload}: PayloadAction<PayloadSetActiveVideo>) => {},
    disableAllSlices: () => {},
  },
});

export const {
  initializeSlice,
  incrementListIndex,
  decrementListIndex,
  setListIndex,
  toggleVideoIsPlaying,
  setIsPlayingVideo,
  setActiveVideo,
  disableAllSlices,
} = videoManagementSlice.actions;

export default videoManagementSlice;
