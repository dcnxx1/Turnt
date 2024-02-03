type TVideoSlice = 'playlistVideoSlice' | 'homeVideoSlice';

export enum VideoSlice {
  PlaylistSlice = 'playlistVideoSlice',
  HomeSlice = 'homeVideoSlice',
}

export type PayloadInitializeSlice = {
  initializeSlice: TVideoSlice;
  isActive: boolean;
  isPlaying: boolean;
  listIndex: number;
  activeVideo: {
    video_id: string;
    duration: number;
  };
};

export type PayloadSetListIndex = {
  index: number;
};

export type PayloadSetIsPlayingVideo = {
  isPlaying: boolean;
};

export type PayloadSetActiveVideo = {
  video_id: string;
  duration: number;
};
