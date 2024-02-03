import {create} from 'zustand';
import {ITurn} from '../models/turn';

type TurnMeta = {
  duration: number;
};

type ActiveTurn = {
  activeTurn: TurnMeta;
  setActiveTurn: (turn: TurnMeta) => void;
};

const useActiveTurnStore = create<ActiveTurn>(set => ({
  activeTurn: {} as TurnMeta,
  setActiveTurn: (turn: TurnMeta) => set({activeTurn: turn}),
}));

export default useActiveTurnStore;
