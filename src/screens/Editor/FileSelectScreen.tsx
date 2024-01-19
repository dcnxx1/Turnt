import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StyleSheet, Text} from 'react-native';
import {Button} from 'react-native-paper';
import {SkeletonScreen} from '../../components';
import {withLinearGradient} from '../../components/Screen/SkeletonScreen';
import {millisToSeconds} from '../../helpers';
import {EditorParams} from '../../nav/navparams';

import theme from '../../theme';
import {restoreTrackPlayerCapabilities} from '../../utils';
import {getAudioDuration} from './hooks/useGenerateThumbnails';
import {
  VideoCoverColor,
  chooseDefaultCoverImage,
  getMp3File,
  getVideoFile,
} from './utils';
const LinearGradientScreen = withLinearGradient(SkeletonScreen);

type EditorParamsPath = EditorParams['EditorScreen'];

export default function FileSelectScreen() {
  // const {
  //   profile: {username},
  // } = useLocalUserProfile();
  const navigation = useNavigation<StackNavigationProp<EditorParams>>();
  const defaultCoverColor: VideoCoverColor = chooseDefaultCoverImage();

  const navigateToEditorScreen = (params: EditorParams['EditorScreen']) => {
    navigation.navigate('EditorScreen', params);
  };

  const onPressSelectAudio = async () => {
    try {
      const mp3File = await getMp3File();
      if (mp3File) {
        const decodeUri = decodeURIComponent(mp3File.uri);
        const duration = await getAudioDuration(decodeUri);

        const params: EditorParamsPath = {
          filePath: mp3File.uri,
          duration: Number(duration),
          fileType: 'Audio',
          mime: mp3File.type ?? 'audio/mp3',
          defaultCoverColor,
        };
        navigateToEditorScreen(params);
      }
    } catch (err) {
      console.log('ERR SELECT AUDIO :>>', err);
    }
  };

  const onPressSelectVideo = async () => {
    const videoFile = await getVideoFile();
    if (videoFile) {
      const params: EditorParamsPath = {
        filePath: videoFile.path,
        duration: millisToSeconds(videoFile.duration ?? 0),
        fileType: 'Video',
        mime: videoFile.mime,
        defaultCoverColor,
      };

      navigateToEditorScreen(params);
    }
  };

  const onPressGoBack = () => {
    restoreTrackPlayerCapabilities();
    navigation.goBack();
  };
  const header = (
    <>
      <Text onPress={onPressGoBack}>Terug</Text>
      <Text style={Style.headerText}>Welkom {''}</Text>
      <Text style={Style.colorWhite}>
        Kies een MP3 bestand of een video om te uploaden
      </Text>
    </>
  );

  const content = (
    <>
      <Button onPress={onPressSelectAudio} style={Style.button}>
        <Text style={Style.buttonText}>MP3 Bestand uploaden</Text>
      </Button>
      <Button onPress={onPressSelectVideo} style={Style.button}>
        <Text style={Style.buttonText}>Video Uploaden</Text>
      </Button>
    </>
  );

  return (
    <LinearGradientScreen
      contentStyle={Style.content}
      header={header}
      headerStyle={Style.headerStyle}
      hasSafeAreaInsets
      content={content}
      gradient={[theme.color.turnerDark, '#000']}
    />
  );
}

const Style = StyleSheet.create({
  content: {
    height: '100%',
    flex: 2,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  headerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    flex: 1,
    gap: 20,
  },
  colorWhite: {
    color: 'white',
    fontSize: 18,
  },
  headerText: {
    color: 'white',
    fontSize: 24,
  },
  button: {
    borderWidth: 2,
    borderColor: 'white',
    minWidth: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
  icon: {
    width: '10%',
    height: '10%',
    resizeMode: 'cover',
    aspectRatio: 1,
  },
  leftIcon: {
    resizeMode: 'cover',
    width: 35,
    height: 35,
    transform: [{rotate: '180deg'}],
  },
});
