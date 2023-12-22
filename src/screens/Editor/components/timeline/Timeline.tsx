import {Image, LayoutChangeEvent, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import theme from '../../../../theme';
import useGenerateThumbnails, {
  NUMBER_OF_THUMBNAILS_TO_EXTRACT,
} from '../../hooks/useGenerateThumbnails';
import TimelineSlider from './TimelineSlider';
import {useCallback, useEffect, useRef, useState} from 'react';

type Props = {
  duration: number;
  filePath: string;
  sliderValue: number;
  onChange: () => void;
};

export type TimelineDimensions = {
  width: number;
  readonly height: number;
};

const useComponentSize = (): [
  TimelineDimensions,
  (e: LayoutChangeEvent) => void,
] => {
  const [size, setSize] = useState<TimelineDimensions>({
    height: 0,
    width: 0,
  });

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const {width, height} = event.nativeEvent.layout;
    setSize({width, height});
  }, []);

  return [size, onLayout];
};

export default function Timeline({
  duration,
  filePath,
  sliderValue,
  onChange,
}: Props) {
  const [thumbnails, isLoading] = useGenerateThumbnails(
    filePath,
    NUMBER_OF_THUMBNAILS_TO_EXTRACT,
  );
  const [size, onLayout] = useComponentSize();

  return (
    <View onLayout={onLayout} style={Style.container}>
      <View>
        <View style={[Style.thumbnailContainer]}>
          {thumbnails.map(thumbnailPath => (
            <Image
              key={thumbnailPath}
              style={[Style.image]}
              source={{uri: thumbnailPath}}
            />
          ))}
        </View>
        <TimelineSlider
          timelineDimensions={size}
          setVideoTime={onChange}
          videoProgress={sliderValue}
          maximumValue={duration}
        />
      </View>
    </View>
  );
}

const Style = StyleSheet.create({
  container: {
 
  },
  thumbnailContainer: {
    width: '100%',
    flexDirection: 'row',
    borderWidth: 3,
    borderRadius: 15,
    borderColor: theme.color.turner,
    overflow: 'hidden',
  },
  image: {
    width: 50,
    height: 50,
    borderWidth: 2,
    resizeMode: 'cover',
  },
});
