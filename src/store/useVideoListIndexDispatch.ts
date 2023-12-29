import {create} from 'zustand';

type VideoListIndex = {
  index: number;
  increment: () => void;
  decrement: () => void;
  setIndex: (index: number) => void;
};

const useVideoListIndexDispatch = create<VideoListIndex>((set, get) => ({
  index: 0,
  increment: () => set(state => ({index: state.index + 1})),
  decrement: () =>
    set(state => ({index: state.index <= 0 ? state.index : state.index - 1})),
  setIndex: (index: number) => set({index}),
}));

export default useVideoListIndexDispatch;
