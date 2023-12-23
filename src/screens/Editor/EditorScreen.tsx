import {Controller, useForm} from 'react-hook-form';
import {KeyboardAvoidingView, Platform, StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {TextInput} from 'react-native-paper';
import {z} from 'zod';
import {ITurn} from '../../models/turn';
import {EditorParams} from '../../nav/navparams';
import Timeline from './components/timeline/Timeline';
import EditorVideoManager from './components/videoManager/EditorVideoTimelineManager';
import theme from '../../theme';
import CoverSelect from './components/CoverSelect';

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
    <KeyboardAvoidingView
      style={Style.keyboardAvoidStyle}
      keyboardVerticalOffset={100}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        contentInsetAdjustmentBehavior={'scrollableAxes'}
        contentContainerStyle={Style.container}>
        <View style={Style.videoWrapper}>
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
        </View>

        <Controller
          control={control}
          name={'title'}
          render={({field: {onChange, value}}) => (
            <TextInput
              numberOfLines={1}
              style={Style.textInput}
              label={'Titel'}
              value={value}
              onChangeText={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name={'cover'}
          render={({field: {onChange, value}}) => <CoverSelect onChange={onChange} value={value} />}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const Style = StyleSheet.create({
  container: {
    gap: 50,
  },
  videoContainer: {
    width: '100%',
    height: '80%',
  },
  keyboardAvoidStyle: {
    flex: 1,
  },
  textInput: {
    borderColor: theme.color.turner,
    borderWidth: 2,
  },
  videoWrapper: {},
});
