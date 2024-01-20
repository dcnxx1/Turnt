import {ReactNode, createContext, useContext, useEffect, useState} from 'react';
import {ITurn} from '../../models/turn';
import {useActiveTurnStore} from '../../store';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import TrackPlayer from 'react-native-track-player';
import {turnToTrackMapper} from '../../utils';

const ContextVideoList = createContext<{
  activeTurn: ITurn;
  setActiveTurn: React.Dispatch<React.SetStateAction<ITurn>>;
}>(
  {} as {
    activeTurn: ITurn;
    setActiveTurn: React.Dispatch<React.SetStateAction<ITurn>>;
  },
);

type Props = {
  defaultValue: ITurn;
  id: 'playlistSlice' | 'homeSlice';
  children: ReactNode;
};

export default function VideoListContext({defaultValue, children, id}: Props) {
  const [activeTurn, setActiveTurn] = useState<ITurn>(defaultValue);
  const {setActiveTurn: setActiveTurnStore} = useActiveTurnStore();
  const isActive = useSelector((state: RootState) => state[id].isActive);

  
  useEffect(() => {
    if (isActive) {
      setActiveTurnStore(activeTurn);
      TrackPlayer.load(turnToTrackMapper(activeTurn));
    }
  }, [activeTurn, isActive]);

  return (
    <ContextVideoList.Provider value={{activeTurn, setActiveTurn}}>
      {children}
    </ContextVideoList.Provider>
  );
}

export const useVideoListContext = () => {
  const context = useContext(ContextVideoList);
  if (!context) {
    throw new Error('useVideoListContext needs to be used within its provider');
  }
  return context;
};
