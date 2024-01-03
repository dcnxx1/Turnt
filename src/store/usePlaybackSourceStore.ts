import {create} from 'zustand';

export type Source = 'Home' | 'Playlist';

type PlaybackSource = {
  playbackSource: Source;
  setPlaybackSource: (playbackSource: Source) => void;
};

const usePlaybackSourceStore = create<PlaybackSource>(set => ({
  playbackSource: 'Playlist',
  setPlaybackSource: (playbackSource: Source) => set({playbackSource}),
}));
export default usePlaybackSourceStore;
