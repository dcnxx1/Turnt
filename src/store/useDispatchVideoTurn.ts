import {create} from 'zustand';
import {ITurn} from '../models/turn';

type Action = {
  dispatch: (state: ActionTypes) => void;
};

type ActionTypes = 'PLAY_NEXT' | 'PLAY_PREVIOUS' | null;

type State = {
  type: ActionTypes;
};

const useDispatchVideoTurn = create<Action & State>(set => ({
  type: null,
  dispatch: (action: ActionTypes) => set({type: action}),
}));

export const ScrollToTurn = create<{
  turn: ITurn;
  toTurn: (turn: ITurn) => void;
}>(set => ({
  turn: {} as ITurn,
  toTurn: (turn: ITurn) => set({turn}),
}));

export default useDispatchVideoTurn;
