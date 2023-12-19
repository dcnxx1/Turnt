import {create} from 'zustand';

type Action = {type: 'NEXT'} | {type: 'TOGGLE_PLAY_PAUSE'} | {type: 'PREVIOUS'};

type VideoState = {
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
};

type State = {
  PLAY_PAUSE: string;
  NEXT: string;
  PREVIOUS: string;
};

const reducer = (state: State, {type}: Action) => {
  switch (type) {
    case 'NEXT':
      return {offsetIndexBy: +1};
    case 'PREVIOUS':
      return {offsetIndexBy: -1};
    case 'TOGGLE_PLAY_PAUSE':
      return 'TOGGLEPLAYPAUSE';
  }
};
