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
  genre: string;
  // TGenre;
  user: {alias?: string};
  created_at?: string;
}
