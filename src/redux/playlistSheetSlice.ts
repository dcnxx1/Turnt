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
    setNewPosition: (state, action) => {
      state.bottomSheetPosition = action.payload.bottomSheetPosition;
      (state.scrollToIndex = action.payload.scrollToIndex),
        (state.data = action.payload.data);
    },
  },
});

export const {setPosition, setNewPosition} = playlistSheetSlice.actions;

export default playlistSheetSlice.reducer;
