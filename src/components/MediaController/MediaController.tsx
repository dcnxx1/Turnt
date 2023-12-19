import MediaControllerView from './components/MediaControllerView';
import {useActiveTurn} from '../../store';

type MediaControllerProps = {
  tabHeight: number;
};

export default function MediaController({tabHeight}: MediaControllerProps) {
  const {activeTurn} = useActiveTurn();

  return <MediaControllerView tabHeight={tabHeight} />;
}
