import {PayloadAction, createSlice} from '@reduxjs/toolkit';

type PlaylistSheetState = 'Hidden' | 'Partial' | 'FullScreen';

const playlistSheetSlice = createSlice({
  name: 'playlistSheetSlice',
  initialState: {
    position: 'Hidden' as PlaylistSheetState,
  },
  reducers: {
    setPosition: (state, {payload}: PayloadAction<PlaylistSheetState>) => {
      switch (payload) {
        case 'FullScreen': {
          return {
            ...state,
            position: 'FullScreen',
          };
        }
        case 'Hidden': {
          return {
            ...state,
            position: 'Hidden',
          };
        }
        case 'Partial': {
          return {
            ...state,
            position: 'Partial',
          };
        }
      }
    },
  },
});

export const {setPosition} = playlistSheetSlice.actions;

export default playlistSheetSlice.reducer;
