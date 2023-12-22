import { Slider } from '@miblanchard/react-native-slider';
import { useState } from 'react';
import { sliderStyle } from '../configs';

type SliderProps = {
  videoProgress: number;
  setVideoProgress: (value: number) => void;
  maximumValue: number;
  style?: Partial<SliderProps>;
};

export default function MediaControllerSlider({
  videoProgress,
  setVideoProgress,
  maximumValue,
  style = sliderStyle,
}: SliderProps) {
  const [isSeeking, setSeeking] = useState(false);
  const [seekProgress, setSeekProgress] = useState(0);

  const onSlideComplete = (val: number[]) => {
    setSeeking(false);
    const seekTo = val[0];
    setVideoProgress(seekTo);
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
      value={isSeeking ? seekProgress : videoProgress}
      onSlidingComplete={onSlideComplete}
      {...style}
    />
  );
}
