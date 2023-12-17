import {Dimensions, StyleSheet, View} from 'react-native';
import SkeletonScreen from '../SkeletonScreen/SkeletonScreen';
import Video from 'react-native-video';
import {useEffect} from 'react';
import {useTurnContext} from '../../shared/context/TurnContext';

interface TurnProps {
  source: string;
  id: number;
}

export default function Turn({source, id}: TurnProps) {
  const {activeTurnId} = useTurnContext();

  const content = (
    <Video
      source={{uri: source}}
      resizeMode={'cover'}
      paused={activeTurnId !== id}
      style={{
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
      }}
    />
  );

  return <SkeletonScreen style={Style.container} content={content} />;
}

const Style = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').height,
    height: Dimensions.get('screen').height,
  },
});
