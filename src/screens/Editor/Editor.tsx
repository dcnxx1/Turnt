import {Dimensions, Text, View, StyleSheet} from 'react-native';
import {SkeletonScreen} from '../../components';
import {withLinearGradient} from '../../components/SkeletonScreen/SkeletonScreen';
import {RouteProp, useRoute} from '@react-navigation/native';
import {EditorParams} from '../../nav/navparams';
import theme from '../../theme';
import RNFS from 'react-native-fs';
import {
  getThumbnails,
  getVideoFramesCount,
  thumbnailDirPath,
} from '../../helpers';
import {FFmpegKit, FFprobeKit} from 'ffmpeg-kit-react-native';
import {useEffect} from 'react';
import {Button} from 'react-native-paper';

const LinearGradientScreen = withLinearGradient(SkeletonScreen);

export default function Editor(): JSX.Element {
  const {params} = useRoute<RouteProp<EditorParams>>();
  const onPressSubmitWithoutErrors = () => {};
  console.log('duration :>>', params?.duration);
  const deleteDir = async () => {
    try {
      const thumbnailDir = await thumbnailDirPath();
      if (thumbnailDir) {
        const dirContent = await RNFS.readDir(thumbnailDir);

        dirContent.forEach(({path}) => {
          RNFS.unlink(path).then(res => console.log('REMOVED :>>', res));
        });
      }
    } catch (err) {
      console.log('ERR DELETE CONTENT DIR :>>', err);
    }
  };
  const content = (
    <>
      <Button onPress={deleteDir}>
        <Text style={{color: 'white'}}>Delete dir</Text>
      </Button>
    </>
  );

  const generateTimeline = async (filePath: string) => {
    try {
    } catch (err) {
      console.log('err', err);
    }
  };

  useEffect(() => {
    async function genSome() {
      if (params?.filePath) {
        await generateTimeline(params.filePath);
      }
    }
    genSome();
  }, []);
  return (
    <LinearGradientScreen
      gradient={[theme.color.turnerDark, '#000']}
      content={content}
      styleContent={Style.content}
    />
  );
}

const Style = StyleSheet.create({
  content: {
    borderWidth: 2,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
