import {configureStore, createListenerMiddleware} from '@reduxjs/toolkit';
import playlistSheetSlice from './playlistSheetSlice';

import homeSlice from './listSlices/homeSlice';
import playlistSlice from './listSlices/playlistSlice';
import videoListSlice, {setIndex} from './videoListSlice';
import {useActiveTurnStore} from '../store';

const listenerMiddleWare = createListenerMiddleware();
listenerMiddleWare.startListening({
  actionCreator: setIndex,
  effect: (action, listenerApi) => {
    console.log('action payload :>>', action.payload);
    useActiveTurnStore.setState({
      activeTurn: {
        duration: action.payload,
      },
    });

  },
});

export const store = configureStore({
  reducer: {
    playlistSheetSlice,
    [homeSlice.reducerPath]: homeSlice.reducer,
    [playlistSlice.reducerPath]: playlistSlice.reducer,
  },
  middleware: getDefaultMiddleWare =>
    getDefaultMiddleWare().prepend(listenerMiddleWare.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
