import {Controller, useForm} from 'react-hook-form';
import {Dimensions, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {TextInput} from 'react-native-paper';
import {z} from 'zod';
import {Flex} from '../../../components';
import {ITurn} from '../../../models/turn';
import {EditorParams} from '../../../nav/navparams';
import Timeline from './timeline/Timeline';
import EditorVideoManager from './videoManager/EditorVideoTimelineManager';

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
    <ScrollView contentInsetAdjustmentBehavior={'scrollableAxes'} contentContainerStyle={Style.container}>
      <EditorVideoManager
        impressionStartAt={watchImpressionStartAt}
        source={filePath}
      />

      <Controller
        control={control}
        name="impressionStartAt"
        render={({field: {onChange, value}}) => {
          return (
            <Timeline
              onChange={onChange}
              sliderValue={value}
              duration={duration}
              filePath={filePath}
            />
          );
        }}
      />

      <Controller
        control={control}
        name={'title'}
        render={({field: {onChange, value}}) => (
          <TextInput label={'Title'} value={value} onChange={onChange} />
        )}
      />
    </ScrollView>
  );
}

const Style = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  videoContainer: {
    width: '100%',
    height: '80%',
  },
});
