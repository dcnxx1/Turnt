import {Dimensions, StyleSheet} from 'react-native';
import Video from 'react-native-video';
import {useTurnContext} from '../../shared/context/TurnContext';
import SkeletonScreen from '../SkeletonScreen/SkeletonScreen';

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
      ignoreSilentSwitch={'ignore'}
      playInBackground
      progressUpdateInterval={1000}
      pictureInPicture={false}
      playWhenInactive
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
