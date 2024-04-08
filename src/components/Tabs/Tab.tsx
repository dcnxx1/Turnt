import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {UseQueryResult, useQueryClient} from '@tanstack/react-query';
import {useRef, useState} from 'react';
import {
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import PagerView from 'react-native-pager-view';
import {
  FadeIn,
  default as RNAnimated,
  useSharedValue,
} from 'react-native-reanimated';
import {queryKey} from '../../api/api';
import {ITurn} from '../../models/turn';
import {HomeParams} from '../../nav/navparams';
import useLocalProfile from '../../store/useLocalProfile';
import FallbackMessage from '../Error/FallbackMessage';
import SavedSongList from '../PlaylistSheet/SavedSongList';
import {useActiveTurnStore} from '../../store';

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
  const pagerViewRef = useRef<PagerView>(null);
  const me = useLocalProfile();

  const onEmptyUpload = () => {
    navigation.navigate('EditorStack');
  };
  const onEmptyPlaylist = () => {
    navigation.navigate('HomeScreen');
  };

  const onPageSelected = (position: OnPageSelected) => {
    if (pagerViewRef.current && position) {
      pagerViewRef.current.setPage(position?.nativeEvent.position);
      setTabKey(position?.nativeEvent.position);
    }
  };

  const handleTabKeyPress = (position: number) => {
    pagerViewRef.current?.setPage(position);
    setTabKey(position);
  };

  return (
    <RNAnimated.View
      entering={FadeIn.delay(100)}
      style={[Style.container, style]}>
      <View style={Style.tabSelectorContainer}>
        <RNAnimated.Text
          onPress={() => handleTabKeyPress(0)}
          style={[Style.text, {color: tabKey === 0 ? 'white' : 'gray'}]}>
          Favorieten
        </RNAnimated.Text>
        {me.user?.role === 'Artist' && (
          <RNAnimated.Text
            onPress={() => handleTabKeyPress(1)}
            style={[Style.text, {color: tabKey === 1 ? 'white' : 'gray'}]}>
            Mijn uploads
          </RNAnimated.Text>
        )}
      </View>
      <PagerView
        overdrag
        collapsable
        onPageSelected={onPageSelected}
        ref={pagerViewRef}
        initialPage={tabKey}
        style={Style.pagerViewContainer}>
        <View key="1">
          <FallbackMessage
            message="Je hebt nog geen Turns togevoegd"
            ctaMessage="Naar Home pagina"
            onEmptyPressAction={onEmptyPlaylist}
            style={Style.playlistFallback}
            queryKeyToRefetch={'playlist'}
            isFetching={playlist.isFetching}
            isRefetching={playlist.isRefetching}
            isError={playlist.isError}
            data={playlist.data}>
            <SavedSongList
              queryKeyRefresh={queryKey.playlist}
              data={playlist.data ?? []}
            />
          </FallbackMessage>
        </View>
        <View key="2">
          <FallbackMessage
            ctaMessage="Uploaden"
            message="Je hebt nog geen Turns geuploaded"
            onEmptyPressAction={onEmptyUpload}
            style={Style.fallbackMyUploads}
            data={myUploads.data}
            queryKeyToRefetch={'myUploads'}
            isRefetching={myUploads.isRefetching}
            isError={myUploads.isError}>
            <SavedSongList
              queryKeyRefresh={queryKey.myUploads}
              data={myUploads.data ?? []}
            />
          </FallbackMessage>
        </View>
      </PagerView>
    </RNAnimated.View>
  );
}

const Style = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabSelectorContainer: {
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
