import {create} from 'zustand';

type Source = 'Home' | 'Playlist';

type PlaybackSource = {
  playbackSource: Source;
  setPlaybackSource: (playbackSource: Source) => void;
};

const usePlaybackSourceStore = create<PlaybackSource>(set => ({
  playbackSource: 'Playlist',
  setPlaybackSource: (playbackSource: Source) => set({playbackSource}),
}));
export default usePlaybackSourceStore;
