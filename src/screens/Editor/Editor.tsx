import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useEffect} from 'react';
import {Image, Pressable, StyleSheet} from 'react-native';
import RNFS from 'react-native-fs';
import {Text} from 'react-native-paper';
import {SkeletonScreen} from '../../components';
import {withLinearGradient} from '../../components/SkeletonScreen/SkeletonScreen';
import {getThumbnailDirectoryPathOrCreate} from '../../helpers';
import {EditorParams} from '../../nav/navparams';
import theme from '../../theme';
import EditorScreen from './components/EditorScreen';
const LinearGradientScreen = withLinearGradient(SkeletonScreen);

const deleteThumbnailContent = async () => {
  const thumbnailDir = await getThumbnailDirectoryPathOrCreate();
  if (thumbnailDir) {
    const thumbnailDirContent = await RNFS.readDir(thumbnailDir);
    thumbnailDirContent.forEach(({path}) => {
      RNFS.unlink(path);
    });
  }
};

export default function Editor(): JSX.Element {
  const {params} = useRoute<RouteProp<EditorParams>>()!;
  const navigation = useNavigation<StackNavigationProp<EditorParams>>();

  const onPressSubmitWithoutErrors = () => {};

  const onPressGoBack = async () => {
    navigation.navigate('FileSelectScreen');
  };

  useEffect(() => {
    const navver = navigation.addListener('beforeRemove', async () => {
      await deleteThumbnailContent();
      navigation.navigate('FileSelectScreen');
    });

    return () => {
      navigation.removeListener('beforeRemove', navver);
    };
  }, [navigation]);

  const header = (
    <Pressable onPress={onPressGoBack} style={Style.headerStyle}>
      <Image
        style={Style.leftIcon}
        source={require('../../assets/icons/profile.png')}
      />
      <Text style={Style.headerText}> Terug</Text>
    </Pressable>
  );

  const content = params && (
    <EditorScreen onSubmit={onPressSubmitWithoutErrors} params={params} />
  );

  return (
    <LinearGradientScreen
      scrollEnabled
      header={header}
      headerStyle={Style.headerStyle}
      hasSafeAreaInsets
      gradient={[theme.color.turnerDark, '#000']}
      content={content}
      styleContent={Style.content}
    />
  );
}

const Style = StyleSheet.create({
  content: {
    paddingHorizontal: 10,
  },
  headerStyle: {
    flexDirection: 'row',
    paddingBottom: 5,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  headerText: {
    color: 'white',
    fontSize: 16,
  },
  leftIcon: {
    resizeMode: 'cover',
    width: 45,
    height: 45,
  },
});
