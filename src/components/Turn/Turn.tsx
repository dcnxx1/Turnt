import {Dimensions, StyleSheet, View} from 'react-native';
import SkeletonScreen from '../SkeletonScreen/SkeletonScreen';
import Video from 'react-native-video';
import {useEffect} from 'react';

interface TurnProps {
  source: string;
  id: string;
  currentActiveTurn: string;
}

export default function Turn({source, id, currentActiveTurn}: TurnProps) {
  useEffect(() => {
    console.log('ActiveTurnChanged :>>', currentActiveTurn);
  }, [currentActiveTurn]);
  const content = (
    <Video
      source={{uri: source}}
      resizeMode={'cover'}
      paused={currentActiveTurn !== id}
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
