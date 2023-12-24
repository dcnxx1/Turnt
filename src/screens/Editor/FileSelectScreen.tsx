import {Alert, StyleSheet, Text} from 'react-native';
import DocumentPicker, {
  DocumentPickerResponse,
  isCancel,
} from 'react-native-document-picker';
import {Button} from 'react-native-paper';
import {SkeletonScreen} from '../../components';
import {withLinearGradient} from '../../components/SkeletonScreen/SkeletonScreen';
import useLocalUserProfile from '../../shared/hooks/useLocalUserProfile';
import theme from '../../theme';
import ImageCropPicker, {Video} from 'react-native-image-crop-picker';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {EditorParams} from '../../nav/navparams';
import {millisToSeconds} from '../../helpers';
const LinearGradientScreen = withLinearGradient(SkeletonScreen);

type EditorParamsPath = EditorParams['EditorScreen'];

function errorAlertWithCallback<T>(fnToRerun: () => T | void) {
  Alert.alert('Oeps', 'Er is iets mis gegaan', [
    {
      style: 'cancel',
      text: 'Annuleren',
    },
    {
      style: 'default',
      isPreferred: true,
      text: 'Opnieuw proberen',
      onPress: () => {
        fnToRerun();
        return;
      },
    },
  ]);
}

async function getMp3File(): Promise<DocumentPickerResponse | undefined> {
  const audioMimeTypes = DocumentPicker.types.audio;

  try {
    const mp3File = await DocumentPicker.pickSingle({
      type: [audioMimeTypes],
      mode: 'import',
      allowMultiSelection: false,
    });
    if (mp3File) {
      console.log('mp3 fike :>', mp3File);
      return mp3File;
    }
  } catch (err) {
    if (!isCancel(err)) {
      errorAlertWithCallback(getMp3File);
    }
  }
}

async function getVideoFile(): Promise<Video | undefined> {
  try {
    const videoFile = await ImageCropPicker.openPicker({
      mediaType: 'video',
      loadingLabelText: 'Ophalen...',
      multiple: false,
      compressVideoPreset: 'HighestQuality'
    });
    return videoFile;
  } catch (err: any) {
    const message: string = err.message;
    if (!message.includes('User')) {
      errorAlertWithCallback(getVideoFile);
    }
  }
}

export default function FileSelectScreen() {
  const {
    profile: {username},
  } = useLocalUserProfile();
  const navigation = useNavigation<StackNavigationProp<EditorParams>>();
  
  const onPressSelectAudio = async () => {
    const mp3File = await getMp3File();
    if (mp3File) {
      const params: EditorParamsPath = {
        filePath: mp3File.uri,
        duration: null,
        fileType: 'Audio',
        mime: mp3File.type ?? 'audio/mp3',
      };
      navigateToEditorScreen(params);
    }
  };

  const navigateToEditorScreen = (params: EditorParams['EditorScreen']) => {
    navigation.navigate('EditorScreen', params);
  };

  const onPressSelectVideo = async () => {
    const videoFile = await getVideoFile();
    if (videoFile) {
      const videoParams: EditorParamsPath = {
        filePath: videoFile.path,
        duration: millisToSeconds(videoFile.duration ?? 0),
        fileType: 'Video',

        mime: videoFile.mime,
      };
      navigateToEditorScreen(videoParams);
    }
  };

  const header = (
    <>
      <Text style={Style.headerText}>Welkom {username}</Text>
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
      styleContent={Style.content}
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
});
