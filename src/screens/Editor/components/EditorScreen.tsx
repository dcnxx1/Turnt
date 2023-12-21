import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {EditorParams} from '../../../nav/navparams';
import EditorVideoManager from './EditorVideoManager';
import Timeline from './Timeline';
import {z} from 'zod';
import {ITurn, Genre} from '../../../models/turn';
import {Prettify, secondsToDisplayTime} from '../../../helpers';
import {Controller, useForm} from 'react-hook-form';
import TimelineSlider from './TimelineSlider';
import {TURN_IMPRESSION_TIME} from '../../../constants';

type Props = {
  onSubmit: () => void;
  params: EditorParams['EditorScreen'];
};

const editorFieldSchema = z.object({
  impressionStartAt: z.number(),
  title: z
    .string()
    .min(1, {message: 'Titel moet meer dan 1 karakter bevatten'}),
  cover: z.string(),
  genre: z.string(),
});

export type EditorFieldValues = {
  impressionStartAt: ITurn['impressionStartAt'];
  cover: ITurn['cover'];
  title: ITurn['title'];
  genre: ITurn['genre'];
};

type EditorFormValues = {
  image: string;
  title: string;
};

type EditorFormValuesType = z.infer<typeof editorFieldSchema>;

export default function EditorScreen({onSubmit, params}: Props) {
  const duration = params.duration || 0;
  const filePath = params.filePath;

  const {
    watch,
    control,
    formState: {errors},
  } = useForm<EditorFormValuesType>({
    defaultValues: {
      impressionStartAt: 0,
      cover: '',
      title: '',
      genre: 'Drill',
    },
  });
  const watchImpressionStartAt = watch('impressionStartAt');
  return (
    <ScrollView
      contentInsetAdjustmentBehavior={'always'}
      contentContainerStyle={Style.container}>
      <View style={Style.videoContainer}>
        <EditorVideoManager
          impressionStartAt={watchImpressionStartAt}
          source={filePath}
        />
      </View>
      <View style={Style.impressionStartStopContainer}>
        <Text style={Style.impressionStartStopText}>
          {secondsToDisplayTime(~~watchImpressionStartAt)} {' '} - {' '}
          {secondsToDisplayTime(
            ~~watchImpressionStartAt + TURN_IMPRESSION_TIME,
          )}
        </Text>
      </View>
      <View style={Style.timelineContainer}>
        <Timeline duration={duration} filePath={filePath} />
        <Controller
          control={control}
          name="impressionStartAt"
          render={({field: {onChange, value}}) => {
            return (
              <TimelineSlider
                setVideoTime={onChange}
                videoProgress={value}
                maximumValue={duration}
              />
            );
          }}
        />
      </View>
    </ScrollView>
  );
}

const Style = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingBottom: '10%',
  },
  videoContainer: {
    width: '100%',
    height: '80%',
  },
  timelineContainer: {},
  impressionStartStopContainer: {
    paddingVertical: 20,
  },
  impressionStartStopText: {
    color: 'white',
    fontSize: 18,
  },
});
