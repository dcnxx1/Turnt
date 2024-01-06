import {create} from 'zustand';
import usePlaybackSourceStore from './usePlaybackSourceStore';

type Action = {
  increment: () => void;
  decrement: () => void;
  setIndex: (index: number) => void;
};

type State = {
  feedIndex: number;
  playlistIndex: number;
  discoverIndex: number;
};

function reducer (state: State, action: Action) {
    const playbackSource = usePlaybackSourceStore.getState().playbackSource
    switch(playbackSource) {
        case 'Home' :{
            action.increment()
        }
    }
}

const useVideoListManagerStore = create<Action & State>((set, get) => ({
  feedIndex: 0,
  playlistIndex: 0,
  discoverIndex: 0,

  increment: () => {},
  decrement: () => {},
  setIndex: () => {},
}));
