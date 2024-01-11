import {ReactNode, createContext, useContext, useEffect} from 'react';
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
  defaultTurn?: ITurn;
  nameSpace: NameSpace;
};

type TVideoListContext = {
  activeTurn: ITurn;
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

export default function VideoListManagerProvider({children}: Props) {
  return (
    <VideoListContext.Provider >
      {children}
    </VideoListContext.Provider>
  );
}
