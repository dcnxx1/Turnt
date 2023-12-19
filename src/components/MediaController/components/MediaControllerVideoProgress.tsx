import {Text} from 'react-native-paper';
import {secondsToDisplayTime} from '../../../helpers';

type VideoProgressProps = {
  progress: number;
};

export default function MediaControllerVideoProgress({
  progress,
}: VideoProgressProps) {
  return (
    <Text
      style={{color: 'white', alignSelf: 'center', borderWidth: 2, padding: 5}}>
      {secondsToDisplayTime(progress)}
    </Text>
  );
}
