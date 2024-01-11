import {ReactNode, createContext, useContext, useState} from 'react';
import {ITurn} from '../../models/turn';

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
  id: string,
  children: ReactNode;
};

export default function VideoListContext({defaultValue, children, id}: Props) {
  const [activeTurn, setActiveTurn] = useState<ITurn>(defaultValue);
  

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
