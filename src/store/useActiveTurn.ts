import {create} from 'zustand';
import {ITurn} from '../models/turn';

type ActiveTurn = {
  activeTurn: ITurn;
  setActiveTurn: (turn: ITurn) => void;
};

const useActiveTurnStore = create<ActiveTurn>(set => ({
  activeTurn: {} as ITurn,
  setActiveTurn: (turn: ITurn) => set({activeTurn: turn}),
}));

export default useActiveTurnStore;
