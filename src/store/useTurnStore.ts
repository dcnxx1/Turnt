import {create} from 'zustand';
import {ITurn} from '../models/turn';

type ActiveTurnProps = {
  title: ITurn['title'];
  artist: ITurn['user']['alias'];
  duration: ITurn['duration'];
  progress: number;
  isSeeking: boolean;
  isPlaying: boolean;
  isActive: boolean;
};

type TurnStore = {
  turns: ActiveTurnProps[];
  setTurns: (turns: ActiveTurnProps[]) => void;
  setNextTurn: (turn: ActiveTurnProps) => void;
};

const useTurnStore = create<TurnStore>((set, get) => ({
  turns: [],
  setTurns: (turns: ActiveTurnProps[]) => set({turns}),

  setNextTurn: (turn: ActiveTurnProps) =>
    set(state => ({
      turns: [...state.turns, turn],
    })),
}));

export default useTurnStore;
