import {create} from 'zustand';

type PlaybackType = 'Video' | 'Audio';

type GlobalPlaybackService = {
  playback: PlaybackType;
  setPlayback: (playback: PlaybackType) => void;
};

const useGlobalPlaybackStore = create<GlobalPlaybackService>(set => ({
  playback: 'Video',
  setPlayback: (playback: PlaybackType) => set({playback}),
}));
export default useGlobalPlaybackStore;
