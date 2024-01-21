import {UseQueryResult, useQueryClient} from '@tanstack/react-query';
import {useRef, useState} from 'react';
import {
  Animated,
  Easing,
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import PagerView from 'react-native-pager-view';
import {Text} from 'react-native-paper';
import {ITurn} from '../../models/turn';
import useLocalProfile from '../../store/useLocalProfile';
import FallbackMessage from '../Error/FallbackMessage';
import SavedSongList from '../PlaylistSheet/SavedSongList';
import RNAnimated, {FadeIn} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {HomeParams} from '../../nav/navparams';
import {queryKey} from '../../api/api';

type Props = {
  playlist: UseQueryResult<ITurn[] | undefined, Error>;
  myUploads: UseQueryResult<ITurn[] | undefined, Error>;
  style?: StyleProp<ViewStyle>;
};

type OnPageSelected =
  | NativeSyntheticEvent<
      Readonly<{
        position: number;
      }>
    >
  | undefined;

export default function Tab({playlist, myUploads, style}: Props) {
  const [tabKey, setTabKey] = useState(0);
  const navigation = useNavigation<StackNavigationProp<HomeParams>>();
  const ref = useRef<PagerView>(null);
  const queryClient = useQueryClient();
  const me = useLocalProfile();
  const onEmptyUpload = () => {
    navigation.navigate('EditorStack');
  };
  const onPageSelected = (position: OnPageSelected) => {
    if (ref.current && position) {
      ref.current.setPage(position?.nativeEvent.position);
      setTabKey(position?.nativeEvent.position);
      console.log('setting position to :>>', position?.nativeEvent.position);
    }
  };
  const onRefreshPlaylist = () => {
    console.log('playlist isState:>>', playlist.isStale);

    queryClient.invalidateQueries({
      queryKey: [queryKey.playlist],
    });
  };

  return (
    <RNAnimated.View
      entering={FadeIn.delay(100)}
      style={[Style.container, style]}>
      <View style={Style.tabSelectorContainer}>
        <Text style={Style.text}>Favorieten</Text>
        <Text style={Style.text}>Mijn uploads</Text>
      </View>
      <PagerView
        collapsable
        onPageSelected={onPageSelected}
        ref={ref}
        initialPage={tabKey}
        style={Style.pagerViewContainer}>
        <View key="1">
          <FallbackMessage
            style={Style.playlistFallback}
            queryKeyToRefetch={'playlist'}
            isFetching={playlist.isFetching}
            isRefetching={playlist.isRefetching}
            isError={playlist.isError}
            data={playlist.data}>
            <SavedSongList
              onRefresh={onRefreshPlaylist}
              data={playlist.data ?? []}
            />
          </FallbackMessage>
        </View>
        <View key="2">
          <FallbackMessage
            onEmptyPressAction={onEmptyUpload}
            style={Style.fallbackMyUploads}
            data={myUploads.data}
            queryKeyToRefetch={'myUploads'}
            isRefetching={myUploads.isRefetching}
            isError={myUploads.isError}>
            <SavedSongList data={myUploads.data ?? []} />
          </FallbackMessage>
        </View>
      </PagerView>
    </RNAnimated.View>
  );
}

const Style = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: 'blue',
    flex: 1,
  },
  tabSelectorContainer: {
    borderWidth: 2,
    borderColor: 'yellow',
    width: '100%',
    flexDirection: 'row',

    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 30,
  },
  pagerViewContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderWidth: 2,
    borderColor: 'red',
  },
  text: {
    fontSize: 16,
    color: 'white',
  },
  fallbackMessageContainer: {},
  playlistFallback: {
    justifyContent: 'center',
  },
  fallbackMyUploads: {
    justifyContent: 'space-evenly',
  },
});
