import {ReactNode, createContext, useContext, useEffect, useState} from 'react';
import {ITurn} from '../../models/turn';
import { TestData } from '../../screens/Home/HomeScreen';

type TurnContext = {
  activeTurnId: number;
  handleSetActiveTurnId: (activeTurnId: number) => void;

  activeTurn: TestData;
  handleSetActiveTurn: (activeTurn: TestData) => void;
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
  const [activeTurnId, setActiveTurnId] = useState(0);
  const [activeTurn, setActiveTurn] = useState({} as TestData);

  const handleSetActiveTurn = (activeTurn: TestData) => setActiveTurn(activeTurn);
  const handleSetActiveTurnId = (activeTurnId: number) =>
    setActiveTurnId(activeTurnId);


  return (
    <ContextTurn.Provider
      value={{
        activeTurnId,
        handleSetActiveTurnId,
        activeTurn,
        handleSetActiveTurn,
      }}>
      {children}
    </ContextTurn.Provider>
  );
}
