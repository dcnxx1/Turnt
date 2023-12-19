import {create} from 'zustand';
type Seek = {
  seekTo: number;
  setSeekTo: (seekTo: number) => void;
};

 const useSeek = create<Seek>(set => ({
  seekTo: 0,
  setSeekTo: (seek: number) => set({seekTo: seek}),
}));

export default useSeek