import {useQuery} from '@tanstack/react-query';
import {FC, ReactNode, useEffect} from 'react';
import TrackPlayer, {Capability, Track} from 'react-native-track-player';
import {getFeed} from '../api/collection';
import {ITurn} from '../models/turn';
import {COVER_KEY, TURN_KEY, useCDN} from '../api/api';
type Props = {
  children: ReactNode;
};

async function setupTrackPlayer() {
  await TrackPlayer.setupPlayer();

  await TrackPlayer.updateOptions({
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,

      Capability.SkipToPrevious,
      Capability.SeekTo,
      Capability.Like,
    ],
  });
}

setupTrackPlayer();

export function turnArrayToTracksMapper(turns: ITurn[]): Track[] {
  return turns.map(turn => {
    return {
      artwork: useCDN(`${COVER_KEY}${turn.cover}`),
      duration: turn.duration,
      artist: turn.user ? turn.user.alias : 'Artiest',
      url: useCDN(TURN_KEY + turn.source),
      title: turn.title,
    };
  });
}

const AppContent: FC<Props> = ({children}: Props) => {
  const {data} = useQuery({queryKey: ['feed'], queryFn: getFeed});
  useEffect(() => {
    async function addToTrackPlayer() {
      if (data) {
        await TrackPlayer.add([...turnArrayToTracksMapper(data)]);
      }
    }
    addToTrackPlayer();
  }, [data]);
  return <>{children}</>;
};

export default AppContent;
