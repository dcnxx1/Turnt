import {ImageBackground, StyleSheet, View} from 'react-native';
import {useActiveTurnStore} from '../../store';
import {ITurn} from '../../models/turn';
import {useTrackPlayerEvents} from 'react-native-track-player';

export type AudioPlayerProps = {
  source: {uri: string};
  paused: boolean;
};

export default function AudioPlayer({source, paused}: AudioPlayerProps) {
  return <ImageBackground source={source} style={Style.imageContainer} />;
}

const Style = StyleSheet.create({
  imageContainer: {},
});
