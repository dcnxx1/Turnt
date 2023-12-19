import {Slider} from '@miblanchard/react-native-slider';
import {sliderConfig} from '../configs';
import {useState} from 'react';
import {useSeek} from '../../../store';

type SliderProps = {
  progress: number;
  onSlidingComplete: (value: number[]) => void;
};

export default function MediaControllerSlider({
  progress,
  onSlidingComplete,
}: SliderProps) {
  const [shadowSeek, setShadowSeek] = useState(0);

  return (
    <Slider
      value={progress}
      onSlidingComplete={onSlidingComplete}
      {...sliderConfig}
    />
  );
}
