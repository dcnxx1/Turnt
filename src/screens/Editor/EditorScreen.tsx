import {zodResolver} from '@hookform/resolvers/zod';
import {useEffect, useRef} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Platform,
  TextInput as RNTextInput,
  StyleSheet,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Button, Icon, Text, TextInput} from 'react-native-paper';
import {z} from 'zod';
import {Genre, ITurn, FileType} from '../../models/turn';
import {EditorParams} from '../../nav/navparams';
import theme from '../../theme';
import CoverSelect from './components/CoverSelect';
import GenreSelect from './components/GenreSelect';
import Timeline from './components/timeline/Timeline';
import EditorVideoManager from './components/videoManager/EditorVideoTimelineManager';

type Props = {
  onSubmit: (editorFieldValues: EditorFormValuesType) => void;
  params: EditorParams['EditorScreen'];
};

const editorFieldSchema = z.object({
  impressionStartAt: z.number(),
  title: z
    .string()
    .min(1, {message: 'Titel moet meer dan 1 karakter bevatten'}),
  cover: z.string().min(1, 'Kies een cover Foto'),
  genre: z.string(),
  fileType: z.string(),
});

export type EditorFieldValues = {
  impressionStartAt: ITurn['impressionStartAt'];
  cover: ITurn['cover'];
  title: ITurn['title'];
  genre: ITurn['genre'];
  fileType: FileType;
};

export type EditorFormValuesType = z.infer<typeof editorFieldSchema>;

export default function EditorScreen({onSubmit, params}: Props) {
  const duration = params.duration || 0;
  const filePath = params.filePath;
  const textInputRef = useRef<RNTextInput>(null);
  const {
    watch,
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<EditorFormValuesType>({
    resolver: zodResolver(editorFieldSchema),
    defaultValues: {
      impressionStartAt: 0,
      cover: '',
      title: '',
      genre: 'Drill',
      fileType: params.fileType,
    },
    reValidateMode: 'onSubmit',
  });
  const watchImpressionStartAt = watch('impressionStartAt');
  const watchCover = watch('cover');

  useEffect(() => {
    if (errors.title) {
      textInputRef.current?.focus();
    }
  }, [errors, textInputRef]);

  return (
    <KeyboardAvoidingView
      style={Style.keyboardAvoidStyle}
      keyboardVerticalOffset={100}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        contentInsetAdjustmentBehavior={'scrollableAxes'}
        contentContainerStyle={Style.container}>
        <View>
          <EditorVideoManager
            fileType={params.fileType}
            defaultCover={params.defaultCoverColor}
            cover={watchCover}
            impressionStartAt={watchImpressionStartAt}
            source={filePath}
          />
          <Controller
            control={control}
            name="impressionStartAt"
            render={({field: {onChange, value}}) => {
              return (
                <Timeline
                  cover={watchCover}
                  defaultCoverColor={params.defaultCoverColor}
                  fileType={params.fileType}
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
            <View>
              <TextInput
                ref={textInputRef}
                numberOfLines={1}
                right={
                  <Icon
                    size={25}
                    source={require('../../assets/icons/arrow.png')}
                  />
                }
                style={Style.textInput}
                label={'Titel'}
                value={value}
                onChangeText={onChange}
              />
              <Text style={{color: 'red'}}>
                {errors.title ? errors.title.message : ''}
              </Text>
            </View>
          )}
        />

        <Controller
          control={control}
          name={'cover'}
          render={({field: {onChange, value}}) => (
            <View>
              <CoverSelect
                defaultCoverColor={params.defaultCoverColor}
                onChange={onChange}
                value={value}
              />
              <Text style={{color: 'red'}}>
                {errors.cover && 'Kies een cover'}
              </Text>
            </View>
          )}
        />

        <Controller
          control={control}
          name="genre"
          render={({field: {onChange, value}}) => (
            <GenreSelect onChange={onChange} value={value as Genre} />
          )}
        />
        <View style={Style.buttonContainer}>
          <Button onPress={() => handleSubmit(onSubmit)()}>
            <Text style={Style.text}>Uploaden</Text>
          </Button>
        </View>
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
  buttonContainer: {
    borderWidth: 2,
    borderColor: theme.color.white,
    borderRadius: 15,
  },
  text: {
    color: theme.color.white,
    fontSize: 18,
  },
});
