import {PayloadAction, createSlice} from '@reduxjs/toolkit';

type PlaylistSheetState = 'Hidden' | 'Partial' | 'FullScreen';

const playlistSheetSlice = createSlice({
  name: 'playlistSheetSlice',
  initialState: {
    position: 'Hidden' as PlaylistSheetState,
  },
  reducers: {
    setPosition: (
      state,
      {payload}: PayloadAction<PlaylistSheetState | number>,
    ) => {
      return {
        ...state,
        position:
          payload === 'FullScreen'
            ? 'FullScreen'
            : payload === 'Hidden'
            ? 'Hidden'
            : 'Partial',
      };
    },
  },
});
export const {setPosition} = playlistSheetSlice.actions;

export default playlistSheetSlice.reducer;
