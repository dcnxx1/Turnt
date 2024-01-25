import {Progress} from 'react-native-track-player';
import {useActiveTurnStore, useVideoStore} from '../../store';
import AudioPlayer from './AudioPlayer';
import {ITurn} from '../../models/turn';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {useEffect, useMemo} from 'react';

type Props = {
  source: string;
  id: ITurn['turn_id'];
};

export default function AudioPlayerManager({source, id}: Props) {
  const activeTurnId = useActiveTurnStore(state => state.activeTurn.turn_id);
  const shouldPlay = activeTurnId === id;

  useEffect(() => {
    console.log({
      activeTurnId,
      id,
    });
  }, [activeTurnId, id]);
  const isPlayingHome = useSelector(
    (state: RootState) => state.homeSlice.isPlaying,
  );
  const setVideoProgress = useVideoStore(state => state.setProgress);
  const onProgress = (progress: Progress) => {
    setVideoProgress(progress.position);
  };
  const onEnd = () => {
    console.log('onEnd called :>!');
  };

  const Playa = useMemo(() => {
    return (
      <AudioPlayer
        onEnd={onEnd}
        onProgress={shouldPlay ? onProgress : undefined}
        paused={shouldPlay ? !isPlayingHome : true}
        source={{uri: source}}
      />
    );
  }, [source, isPlayingHome]);
  return Playa;
}
