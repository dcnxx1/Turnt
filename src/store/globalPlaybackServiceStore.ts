import {create} from 'zustand';

type PlayFrom = 'Home' | 'Playlist';

type GlobalPlaybackService = {
  playingFrom: PlayFrom;
  setPlayback: (playback: PlayFrom) => void;
};

const useGlobalPlaybackStore = create<GlobalPlaybackService>(set => ({
  playingFrom: 'Home',
  setPlayback: (playingFrom: PlayFrom) => set({playingFrom}),
}));
export default useGlobalPlaybackStore;
