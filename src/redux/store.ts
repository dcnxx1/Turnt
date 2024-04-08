import {configureStore} from '@reduxjs/toolkit';
import playlistSheetSlice from './playlistSheetSlice';

import homeSlice from './listSlices/homeSlice';
import playlistSlice from './listSlices/playlistSlice';

export const store = configureStore({
  reducer: {
    playlistSheetSlice,
    [homeSlice.reducerPath]: homeSlice.reducer,
    [playlistSlice.reducerPath]: playlistSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
