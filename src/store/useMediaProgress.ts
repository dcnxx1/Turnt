import {create} from 'zustand';

interface MediaProgress {
  progress: number;
  setProgress: (progress: number) => void;
}

const useMediaProgress = create<MediaProgress>(set => ({
  progress: 0,
  setProgress: (progress: number) => set({progress}),
}));

