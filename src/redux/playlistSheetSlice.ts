import {PayloadAction, createSlice} from '@reduxjs/toolkit';

type PlaylistSheetState = 'Hidden' | 'Partial' | 'FullScreen';

const playlistSheetSlice = createSlice({
  name: 'playlistSheetSlice',
  initialState: {
    position: 'Hidden' as PlaylistSheetState,
    bottomSheetPosition: 'Hidden' as PlaylistSheetState,
    scrollToIndex: 0,
    data: 'myUploads',
  },
  reducers: {
    setPosition: (
      state,
      {payload}: PayloadAction<PlaylistSheetState | number>,
    ) => {
      return {
        ...state,
        bottomSheetPosition:
          payload === 'FullScreen'
            ? 'FullScreen'
            : payload === 'Hidden'
            ? 'Hidden'
            : 'Partial',
      };
    },
    setNewPosition: (
      state,
      {
        payload,
      }: PayloadAction<{
        bottomSheetPosition: PlaylistSheetState;
        scrollToIndex: number;
        data: 'myUploads' | 'playlist';
      }>,
    ) => {
      state.bottomSheetPosition = payload.bottomSheetPosition;
      (state.scrollToIndex = payload.scrollToIndex),
        (state.data = payload.data);
    },
  },
});

export const {setPosition, setNewPosition} = playlistSheetSlice.actions;

export default playlistSheetSlice.reducer;
