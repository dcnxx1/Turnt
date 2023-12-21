import {RouteProp, useRoute} from '@react-navigation/native';
import {StyleSheet, View} from 'react-native';
import {SkeletonScreen} from '../../components';
import {withLinearGradient} from '../../components/SkeletonScreen/SkeletonScreen';
import {EditorParams} from '../../nav/navparams';
import theme from '../../theme';
import Timeline from './components/Timeline';
import {getThumbnailDirectoryPathOrCreate} from '../../helpers';
import RNFS from 'react-native-fs';
import { Button, Text } from 'react-native-paper';
const LinearGradientScreen = withLinearGradient(SkeletonScreen);

const deleteAll = async () => {
  const thumbnailDir = await getThumbnailDirectoryPathOrCreate();
  if (thumbnailDir) {
    const thumbnailDirContent = await RNFS.readDir(thumbnailDir);
    thumbnailDirContent.forEach(({path}) => {
      RNFS.unlink(path);
    });
    console.log("content delted:!")
    await RNFS.unlink(thumbnailDir);
  }
};

export default function Editor(): JSX.Element {
  const {params} = useRoute<RouteProp<EditorParams>>();
  const onPressSubmitWithoutErrors = () => {};

  const content = (
    <>
      <View style={Style.timeline}>
        {params?.duration && params.filePath && (
          <Timeline duration={params?.duration} filePath={params?.filePath} />
        )}
        <Button onPress={deleteAll}>
            <Text style={{color: 'white'}}>
              delete dir
            </Text>
        </Button>
      </View>
    </>
  );

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
    justifyContent: 'center',
    alignContent: 'center',
  },
  timeline: {
    flexDirection: 'column',
    height: '10%',
  },
});
