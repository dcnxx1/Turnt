import {create} from 'zustand';

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

export default useDispatchVideoTurn;
