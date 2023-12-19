import {create} from 'zustand';
import {TestData} from '../screens/Home/HomeScreen';
import {ITurn} from '../models/turn';

type ActiveTurn = {
  activeTurn: ITurn;
  setActiveTurn: (turn: ITurn) => void;
};

const useActiveTurn = create<ActiveTurn>(set => ({
  activeTurn: {} as ITurn,
  setActiveTurn: (turn: ITurn) => set({activeTurn: turn}),
}));

export default useActiveTurn;
