import {Slider} from '@miblanchard/react-native-slider';
import {useState} from 'react';
import {sliderConfig} from '../configs';
import {useVideoStore} from '../../../store';

type SliderProps = {
  progress: number;
  seekVideoTo: (value: number) => void;
  maximumValue: number;
};

export default function MediaControllerSlider({
  progress,
  seekVideoTo,
  maximumValue,
}: SliderProps) {
  const [isSeeking, setSeeking] = useState(false);
  const [seekProgress, setSeekProgress] = useState(0);

  const onSlideComplete = (val: number[]) => {
    setSeeking(false);
    const seekTo = val[0];

    seekVideoTo(seekTo);
  };
  const onSlidingStart = () => {
    setSeeking(true);
  };
  const onValueChange = (val: number[]) => {
    setSeekProgress(val[0]);
  };
  return (
    <Slider
      onSlidingStart={onSlidingStart}
      onValueChange={onValueChange}
      maximumValue={maximumValue}
      value={isSeeking ? seekProgress : progress}
      onSlidingComplete={onSlideComplete}
      {...sliderConfig}
    />
  );
}
