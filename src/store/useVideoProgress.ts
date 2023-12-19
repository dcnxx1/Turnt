import {create} from 'zustand';

interface VideoProgress {
  progress: number;
  setProgress: (progress: number) => void;
}

const useVideoProgress = create<VideoProgress>(set => ({
  progress: 0,
  setProgress: (progress: number) => set({progress}),
}));

export default useVideoProgress;
