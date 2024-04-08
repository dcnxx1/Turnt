import {create} from 'zustand';

type State = {
  progress: number;
  isPlaying: boolean;
};

type Action = {
  setProgress: (progress: number) => void;
  setIsPlaying: (isPlaying: boolean) => void;
};

const useVideoStore = create<State & Action>((set, get) => ({
  progress: 0,
  setProgress: (progress: number = 0) => set({progress}),
  isPlaying: true,
  setIsPlaying: (isPlaying: boolean) => set({isPlaying}),
}));

export default useVideoStore;
