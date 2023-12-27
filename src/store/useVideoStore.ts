import TrackPlayer from 'react-native-track-player';
import {create} from 'zustand';

type State = {
  progress: number;
  isPlaying: boolean;
};

type Action = {
  setProgress: (progress: number) => void;
  setIsPlaying: (isPlaying: boolean) => void;
};

const useVideoStore = create<State & Action>(set => ({
  progress: 0,
  setProgress: (progress: number) => set({progress}),

  isPlaying: true,
  setIsPlaying: (isPlaying: boolean) => set({isPlaying}),
}));

export default useVideoStore;
