import {createSlice} from '@reduxjs/toolkit';
import {ITurn} from '../../models/turn';

export type PlayingFrom = 'Home' | 'Playlist';


type PlayingFromAction = {
  payload: PlayingFrom;
  type: any;
};

type PlayAction = {
  playload: boolean;
  type: any;
};

const targetSlice = createSlice({
  name: 'targetSlice',
  initialState: {
    home: {
      index: 0,
      isPlaying: false,
      activeVideoOnScreen: {} as ITurn,
    },
    playlist: {
      index: 0,
      isPlaying: false,
      activeVideoOnScreen: {} as ITurn,
    },
    playingFrom: 'Home',
  },
  reducers: {
    increment: ({home, playlist, playingFrom}) => {
      playingFrom === 'Home' ? (home.index += 1) : (playlist.index += 1);
    },
    decrement: ({home, playlist, playingFrom}) => {
      playingFrom === 'Home' ? (home.index -= 1) : (playlist.index -= 1);
    },
    setIndex: ({home, playlist, playingFrom}, action) => {
      playingFrom === 'Home'
        ? (home.index = action.payload)
        : (playlist.index = action.payload);
    },
    toggleIsPlaying: ({home, playlist, playingFrom}) => {
      playingFrom === 'Home'
        ? (home.isPlaying = !home.isPlaying)
        : (playlist.isPlaying = !playlist.isPlaying);
    },
    setIsPlaying: ({home, playlist, playingFrom}, action) => {
      playingFrom === 'Home'
        ? (home.isPlaying = action.payload)
        : (playlist.isPlaying = action.payload);
    },
    setIsPlayingFrom: (
      {playingFrom, home, playlist},
      action: PlayingFromAction,
    ) => {
      playingFrom = action.payload;
      if (playingFrom === 'Home') {
        if (home.isPlaying) home.isPlaying = false;
      }
      if (playingFrom === 'Playlist') {
        if (playlist.isPlaying) playlist.isPlaying = false;
      }
    },
    setActiveVideoOnScreen: ({playingFrom, home, playlist}, action) => {
      playingFrom === 'Home'
        ? (home.activeVideoOnScreen = action.payload)
        : (playlist.activeVideoOnScreen = action.payload);
    },
  },
});

export const {
  increment,
  decrement,
  setIndex,
  toggleIsPlaying,
  setIsPlaying,
  setIsPlayingFrom,
  setActiveVideoOnScreen,
} = targetSlice.actions;

export default targetSlice.reducer;
