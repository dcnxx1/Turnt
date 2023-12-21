export interface ITurn {
  turn_id: string;
  title: string;
  source: string;
  impressionStartAt: number;
  alias: string;
  duration: number;
  type: string;
  cover: string;
  artist_id: string;
  impressionSource: string;
  genre: Genre;
  user: {alias?: string};
  created_at?: string;
}

export type FileType = 'Audio' | 'Video';

export type Genre =
  | 'HipHop'
  | 'Rap'
  | 'Trap'
  | 'Hardstyle'
  | 'HardCore'
  | 'Pop'
  | 'Drill'
  | undefined;
