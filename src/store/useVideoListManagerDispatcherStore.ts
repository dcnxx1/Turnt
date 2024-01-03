import {create} from 'zustand';
import usePlaybackSourceStore from './usePlaybackSourceStore';

type VideoListManagerStore = {
  index: number;
  playlistIndex: number;
  increment: () => void;
  decrement: () => void;
  setIndex: (index: number) => void;
};

const useVideoListManagerDispatcherStore = create<VideoListManagerStore>(
  (set) => {
    const playbackStore = usePlaybackSourceStore.getState();

    return {
      index: 0,
      playlistIndex: 0,
      increment: () => {
        const {playbackSource} = playbackStore;
        set(state =>
          playbackSource === 'Home'
            ? {index: state.index + 1}
            : {playlistIndex: state.playlistIndex + 1},
        );
      },
      decrement: () => {
        const {playbackSource} = playbackStore;
        set(state =>
          playbackSource === 'Home'
            ? {index: state.index - 1}
            : {playlistIndex: state.playlistIndex - 1},
        );
      },
      setIndex: (index: number) => {
        const {playbackSource} = playbackStore;
        playbackSource === 'Home' ? set({index}) : set({playlistIndex: index});
      },
    };
  },
);

export default useVideoListManagerDispatcherStore;
