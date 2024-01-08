import {createSlice} from '@reduxjs/toolkit';
export type PlayingFrom = 'Home' | 'PlaylistSheet';

const playingFromSlice = createSlice({
  name: 'playingFromSlice',
  initialState: {
    playingFrom: 'Home',
  },
  reducers: {
    setPlayingFrom: ({playingFrom}, {payload}) => {
      playingFrom = payload;
    },
  },
});

export const {setPlayingFrom} = playingFromSlice.actions;

export default playingFromSlice.reducer;
