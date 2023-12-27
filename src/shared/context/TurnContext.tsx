import {ReactNode, createContext, useContext, useEffect, useState} from 'react';
import {TestData} from '../../screens/Home/HomeScreen';
import {useActiveTurnStore} from '../../store/';
import {ITurn} from '../../models/turn';

type TurnContext = {
  activeTurn: ITurn;
  handleSetActiveTurn: (activeTurn: ITurn) => void;
};

const ContextTurn = createContext({} as TurnContext);

export const useTurnContext = () => {
  const context = useContext(ContextTurn);

  if (!context) {
    throw new Error("useTurnContext must be used inside it's context provider");
  }
  return context;
};

type TurnContextProviderProps = {
  children: ReactNode;
};
export default function TurnContextProvider({
  children,
}: TurnContextProviderProps) {
  const [activeTurn, setActiveTurn] = useState({} as ITurn);
  const {setActiveTurn: storeSetActiveTurn} = useActiveTurnStore();

  const handleSetActiveTurn = (activeTurn: ITurn) => setActiveTurn(activeTurn);

  useEffect(() => {
    storeSetActiveTurn(activeTurn);
  }, [activeTurn]);

  return (
    <ContextTurn.Provider
      value={{
        activeTurn,
        handleSetActiveTurn,
      }}>
      {children}
    </ContextTurn.Provider>
  );
}
