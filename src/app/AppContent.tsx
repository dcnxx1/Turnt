import {NavigationContainer} from '@react-navigation/native';
import {ReactNode} from 'react';
import TrackPlayer, {Capability, Track} from 'react-native-track-player';
import {COVER_KEY, TURN_KEY, useCDN} from '../api/api';
import {ITurn} from '../models/turn';
import {Navigation} from '../nav';
import {RootNavNames} from '../nav/types';
import useLocalUserProfile from '../shared/hooks/useLocalUserProfile';
import {Text} from 'react-native-paper';

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
      Capability.Stop,
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

const AppContent = () => {
  const me = useLocalUserProfile();

  if (me.isLoading) {
    return <Text>WACHT EFE MFER</Text>;
  }

  return (
    <NavigationContainer>
      <Navigation
        initialRoute={
          me.isSignedIn ? RootNavNames.HomeStack : RootNavNames.SetupStack
        }
      />
    </NavigationContainer>
  );
};

export default AppContent;
