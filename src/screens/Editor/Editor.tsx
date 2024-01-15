import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useQueryClient} from '@tanstack/react-query';
import {useEffect} from 'react';
import {Image, Pressable, StyleSheet} from 'react-native';
import {SkeletonScreen} from '../../components';
import {withLinearGradient} from '../../components/SkeletonScreen/SkeletonScreen';
import {deleteThumbnailContent} from '../../helpers';
import {FileType, Genre} from '../../models/turn';
import {EditorParams} from '../../nav/navparams';

import {useActiveTurnStore} from '../../store';
import theme from '../../theme';
import EditorScreen, {EditorFormValuesType} from './EditorScreen';
import useCreateTurn from './hooks/useCreateTurn';
import useLocalProfile from '../../store/useLocalProfile';
const LinearGradientScreen = withLinearGradient(SkeletonScreen);

export default function Editor(): JSX.Element {
  const {params} = useRoute<RouteProp<Pick<EditorParams, 'EditorScreen'>>>()!;
  const createTurnMutation = useCreateTurn();
  const queryClient = useQueryClient();
  const navigation = useNavigation<StackNavigationProp<EditorParams>>();
  const {setActiveTurn} = useActiveTurnStore();
  const me = useLocalProfile();
  
  const onPressSubmitWithoutErrors = (fieldValues: EditorFormValuesType) => {
    createTurnMutation(
      {
        artist_id: me.user?.user_id ?? '',
        cover: fieldValues.cover,
        duration: params?.duration ?? 0,
        genre: fieldValues.genre as Genre,
        impressionStartAt: fieldValues.impressionStartAt,
        source: params?.filePath ?? '',
        title: fieldValues.title,
        type: fieldValues.fileType as FileType,
      },
      {
        onSettled: turn => {
          queryClient.invalidateQueries({queryKey: ['feed']});
          if (turn) {
            setActiveTurn(turn);
            navigation.navigate('HomeScreen');
          }
        },
      },
    );
  };

  const onPressGoBack = async () => {
    navigation.navigate('FileSelectScreen');
  };

  useEffect(() => {
    const beforeRemoveListener = navigation.addListener(
      'beforeRemove',
      async () => {
        await deleteThumbnailContent();
        navigation.navigate('FileSelectScreen');
      },
    );

    return () => {
      navigation.removeListener('beforeRemove', beforeRemoveListener);
    };
  }, [navigation]);

  const header = (
    <Pressable onPress={onPressGoBack} style={Style.headerStyle}>
      <Image
        style={Style.leftIcon}
        source={require('../../assets/icons/arrow.png')}
      />
    </Pressable>
  );

  const content = (
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
      contentStyle={Style.content}
    />
  );
}

const Style = StyleSheet.create({
  content: {
    paddingHorizontal: 10,
    flex: 1,
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
    width: 35,
    height: 35,
    transform: [{rotate: '180deg'}],
  },
});
