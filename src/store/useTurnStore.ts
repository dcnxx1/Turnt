import {create} from 'zustand';
import {ITurn} from '../models/turn';

type TurnStore = {
  title: ITurn['title'];
  artist: ITurn['user']['alias'];
  duration: ITurn['duration'];
  progress: number;
  isSeeking: boolean;

  incrementProgress: () => void;
  setProgress: (progress: number) => void;
  setIsSeeking: (isSeeking: boolean) => void;
};

const useTurnStore = create<TurnStore>(set => ({
  title: '',
  artist: '',
  progress: 0,
  duration: 0,
  isSeeking: false,

  incrementProgress: () => set(state => ({progress: (state.progress += 1)})),
  setProgress: (progress: number) => set({progress}),
  setIsSeeking: (isSeeking: boolean) => set({isSeeking}),
}));
