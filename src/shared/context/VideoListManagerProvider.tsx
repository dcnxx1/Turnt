import {ReactNode, createContext, useContext, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {
  increment,
  setActiveVideoOnScreen,
  setIndex,
  setIsPlaying,
} from '../../redux/videoListManagerSlices/targetSlice';
import {useActiveTurnStore} from '../../store';
import {ITurn} from '../../models/turn';

export type NameSpace = 'home' | 'playlist';

type Props = {
  children: ReactNode;
  nameSpace: NameSpace;
};

type TVideoListContext = {
  index: number;
  isPlaying: boolean;
  activeVideo: ITurn;
  setNewIndex: (index: number) => void;
  setPlaying: (isPlaying: boolean) => void;
  setNewActiveVideo: (activeTurn: ITurn) => void;
  incrementIndex: () => void;
};

const VideoListContext = createContext<TVideoListContext>(
  {} as TVideoListContext,
);

export const useVideoListContext = () => {
  const context = useContext(VideoListContext);

  if (!context) {
    throw new Error("This hook can only be used within it's provider");
  }
  return context;
};

export default function VideoListManagerProvider({children, nameSpace}: Props) {
  const state = useSelector((state: RootState) => state.targetSlice[nameSpace]);
  const dispatch = useDispatch();
  const activeVideo = state.activeVideoOnScreen;

  const isPlaying = state.isPlaying;
  const index = state.index;
  const setActiveTurn = useActiveTurnStore(state => state.setActiveTurn);
  useEffect(() => {
    setActiveTurn(activeVideo);
  }, [activeVideo]);

  useEffect(() => {
    console.log('isPlaying :>>', isPlaying);
  }, [isPlaying]);
  const setNewIndex = (newIndex: number) => {
    dispatch(setIndex(newIndex));
  };
  const setPlaying = (newIsPlaying: boolean) => {
    dispatch(setIsPlaying(newIsPlaying));
  };
  const setNewActiveVideo = (activeTurn: ITurn) => {
    dispatch(setActiveVideoOnScreen(activeTurn));
  };
  const incrementIndex = () => {
    dispatch(increment());
  };
  return (
    <VideoListContext.Provider
      value={{
        isPlaying,
        setPlaying,
        index,
        setNewIndex,
        setNewActiveVideo,
        activeVideo,
        incrementIndex,
      }}>
      {children}
    </VideoListContext.Provider>
  );
}
