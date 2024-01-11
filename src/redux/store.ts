import {configureStore} from '@reduxjs/toolkit';
import targetSlice from './videoListManagerSlices/targetSlice';
import playlistSheetSlice from './playlistSheetSlice';
import playlistSlice from './videoListManagerSlices/playlistSlice';
import homeSlice from './videoListManagerSlices/homeSlice';

export const store = configureStore({
  reducer: {
    targetSlice: targetSlice,
    playlistSheetSlice: playlistSheetSlice,
    playlistSlice: playlistSlice,
    homeSlice: homeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
