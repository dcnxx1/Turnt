import {useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {FileType, ITurn} from '../../../../models/turn';
import theme from '../../../../theme';
import useGenerateThumbnails, {
  NUMBER_OF_THUMBNAILS_TO_EXTRACT,
} from '../../hooks/useGenerateThumbnails';
import {VideoCoverColor, useComponentSize} from '../../utils';
import TimelineSlider from './TimelineSlider';
import {Text} from 'react-native-paper';
type Props = {
  duration: number;
  filePath: string;
  sliderValue: number;
  onChange: () => void;
  fileType: FileType;
  defaultCoverColor: VideoCoverColor;
  cover: ITurn['cover'];
};

export type TimelineDimensions = {
  width: number;
  readonly height: number;
};

export default function Timeline({
  duration,
  filePath,
  sliderValue,
  fileType,
  onChange,
  defaultCoverColor,
  cover,
}: Props) {
  const [size, onLayout] = useComponentSize();

  const [thumbnails, isLoading] = useGenerateThumbnails(
    filePath,
    NUMBER_OF_THUMBNAILS_TO_EXTRACT,
    fileType,
    defaultCoverColor,
    cover,
  );
  useEffect(() => {
    console.log('thumbnails :>>', thumbnails);
  }, [thumbnails]);
  return !isLoading ? (
    <View onLayout={onLayout} style={Style.container}>
      <View>
        <ImageTimelineRow thumbnails={thumbnails} />
        <TimelineSlider
          timelineDimensions={size}
          setVideoTime={onChange}
          videoProgress={sliderValue}
          maximumValue={duration}
        />
      </View>
    </View>
  ) : (
    <Text>Is loading!</Text>
  );
}

type ImageTimelineRowProps = {
  thumbnails: string[] | any[];
};

const ImageTimelineRow = ({thumbnails}: ImageTimelineRowProps) => {
  return (
    <View style={[Style.thumbnailContainer]}>
      {thumbnails.map((thumbnail, index) => {
        return (
          <Image key={index} style={[Style.image]} source={thumbnail.path} />
        );
      })}
    </View>
  );
};

const Style = StyleSheet.create({
  container: {},
  thumbnailContainer: {
    width: '100%',
    flexDirection: 'row',
    borderWidth: 3,
    borderRadius: 15,
    borderColor: theme.color.turner,
    minHeight: 50,
    overflow: 'hidden',
  },
  image: {
    width: 50,
    height: 50,
    borderWidth: 2,
    resizeMode: 'cover',
  },
});
