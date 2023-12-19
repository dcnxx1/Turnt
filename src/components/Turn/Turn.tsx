import {Dimensions, StyleSheet} from 'react-native';
import VideoPlayer from '../Video/VideoPlayer';
import {useTurnContext} from '../../shared/context/TurnContext';

interface TurnProps {
  source: string;
  id: number;
  onEndTurn: () => void;
}

export default function Turn({source, id, onEndTurn}: TurnProps) {
  const {activeTurn} = useTurnContext();

  return (
    <VideoPlayer onEnd={onEndTurn} paused={activeTurn.id !== id} source={source} />
  );
}

const Style = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').height,
    height: Dimensions.get('screen').height,
  },
});
