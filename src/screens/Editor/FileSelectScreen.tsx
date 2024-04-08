import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import {SkeletonScreen} from '../../components';
import {withLinearGradient} from '../../components/Screen/SkeletonScreen';
import {millisToSeconds} from '../../helpers';
import {EditorParams} from '../../nav/navparams';

import GenericScreen from '../../components/Screen/GenericScreen';
import theme from '../../theme';
import {getAudioDuration} from './hooks/useGenerateThumbnails';
import {
  VideoCoverColor,
  chooseDefaultCoverImage,
  getMp3File,
  getVideoFile,
} from './utils';
import useLocalProfile from '../../store/useLocalProfile';
import {useMyRemoteProfile} from '../../shared/hooks/useQueryData';
import Avatar from '../../components/Images/Avatar';
import {useCDN, PF_USER_KEY} from '../../api/api';
const LinearGradientScreen = withLinearGradient(SkeletonScreen);

type EditorParamsPath = EditorParams['EditorScreen'];

export default function FileSelectScreen() {
  const navigation = useNavigation<StackNavigationProp<EditorParams>>();
  const defaultCoverColor: VideoCoverColor = chooseDefaultCoverImage();
  const me = useLocalProfile();
  const remoteProfile = useMyRemoteProfile();

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




  const content = (
    <>
      <View style={Style.welcomeTextContainer}>
        {remoteProfile.data?.alias && (
          <Avatar source={useCDN(remoteProfile.data?.avatar)} />
        )}
        <Text style={{fontSize: 24, color: 'white'}}>
          Welkom {me.user?.username}
        </Text>
      </View>
      <View style={Style.buttonContainer}>
        <Button onPress={onPressSelectAudio} style={Style.button}>
          <Text style={Style.buttonText}>MP3 Bestand uploaden</Text>
        </Button>
        <Button onPress={onPressSelectVideo} style={Style.button}>
          <Text style={Style.buttonText}>Video Uploaden</Text>
        </Button>
      </View>
    </>
  );

  return (
    <GenericScreen
   
      middle={<View><Text style={{color: 'white', fontSize: 22,}}>Uploaden</Text></View>}
      style={Style.content}
      safeAreaInsets
      headerStyle={Style.headerStyle}
      content={content}
    />
  );
}

const Style = StyleSheet.create({
  content: {
    width: '100%',
    backgroundColor: theme.color.turnerDark,

  },

  welcomeTextContainer: {
    width: '100%',
    flex: 1,
    height: '50%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    gap: 40,
    alignItems: 'center',
  },
  headerStyle: {

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
