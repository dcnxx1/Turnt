import {createSlice} from '@reduxjs/toolkit';

const playlistSlice = createSlice({
  name: 'playlistSlice',
  initialState: {
    index: 0,
    isPlaying: false,
  },
  reducers: {
    increment: ({index}) => {
      index += 1;
    },
    decrement: ({index}) => {
      index -= 1;
    },
    togglePlay: ({isPlaying}) => {
      isPlaying = !isPlaying;
    },
    setIsPlaying: ({isPlaying}, {payload}) => {
      isPlaying = payload;
    },
    setPlaylistIndex: ({index}, action) => {
      index = action.payload;
    },
  },
});

export const {increment, decrement} = playlistSlice.actions;

export default playlistSlice.reducer;
