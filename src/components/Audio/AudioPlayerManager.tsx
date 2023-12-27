import {useActiveTurnStore} from '../../store';
import AudioPlayer from './AudioPlayer';

type Props = {
  source: string;
};

export default function AudioPlayerManager() {
  const {activeTurn} = useActiveTurnStore();
  //   return <AudioPlayer />;
}
