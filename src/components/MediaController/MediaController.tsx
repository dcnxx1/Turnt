import {StyleSheet} from 'react-native';
import MediaControllerView from './components/MediaControllerView';
import {useActiveTurn} from '../../store';

export default function MediaController() {
  const {activeTurn} = useActiveTurn();

  return <MediaControllerView />;
}

const Style = StyleSheet.create({
  container: {
    borderWidth: 2,
  },
});
