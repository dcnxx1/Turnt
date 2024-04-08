import {create} from 'zustand';
type Seek = {
  seekTo: number;
  isSeeking: boolean;
  setIsSeeking: (isSeeking: boolean) => void;
  setSeekTo: (seekTo: number) => void;
};

const useSeek = create<Seek>(set => ({
  seekTo: 0,
  isSeeking: false,
  setIsSeeking: (isSeeking: boolean) => set({isSeeking}),
  setSeekTo: (seek: number) => set({seekTo: seek}),
}));

export default useSeek;
