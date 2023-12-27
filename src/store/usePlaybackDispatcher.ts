import {create} from 'zustand';
import useVideoStore from './useVideoStore';

interface PlaybackDispatcher {
  dispatch: (isPlaying: boolean) => void;
}

const usePlaybackDispatcher = create<PlaybackDispatcher>(set => ({
  dispatch: (isPlaying: boolean) => {
    useVideoStore.setState({isPlaying});
  },
}));
export default usePlaybackDispatcher