import {useRef, useState} from 'react';
import {NativeSyntheticEvent, StyleSheet, View} from 'react-native';
import PagerView from 'react-native-pager-view';
import {Text} from 'react-native-paper';
import {queryKey} from '../../api/api';
import getMyUploadsByUserId from '../../api/myUploads';
import {ITurn} from '../../models/turn';
import {QueryResult} from '../../shared/hooks/useQueryData';
import useLocalProfile from '../../store/useLocalProfile';
import ErrorFallback from '../Error/ErrorFallback';
import FallbackMessage from '../Error/FallbackMessage';
import SavedSongList from '../PlaylistSheet/SavedSongList';

type Props = {
  playlist: QueryResult<ITurn>;
  myUploads: QueryResult<ITurn>;
};

type OnPageSelected =
  | NativeSyntheticEvent<
      Readonly<{
        position: number;
      }>
    >
  | undefined;

export default function Tab({playlist, myUploads}: Props) {
  const [tabKey, setTabKey] = useState(0);
  const ref = useRef<PagerView>(null);

  const onPageSelected = (position: OnPageSelected) => {
    if (ref.current && position) {
      ref.current.setPage(position?.nativeEvent.position);
    }
  };
  const me = useLocalProfile();
  const onRefetch = async () => {
    if (me.user) {
      return await getMyUploadsByUserId(me.user?.user_id);
    }
  };
  return (
    <View style={Style.container}>
      <View style={Style.tabSelectorContainer}>
        <Text>Favorieten</Text>
        <Text>Mijn uploads</Text>
      </View>
      <PagerView
        collapsable
        onPageSelected={onPageSelected}
        ref={ref}
        initialPage={tabKey}
        style={Style.pagerViewContainer}>
        <View key="1">
          <SavedSongList data={playlist.data} />
        </View>
        <View key="2">
          {playlist.data.length ? (
            <ErrorFallback
              error={myUploads.error}
              queryKey={queryKey.myUploads}
              onRefetch={onRefetch}>
              <SavedSongList data={myUploads.data} />
            </ErrorFallback>
          ) : (
            <FallbackMessage
              imageHeader={require('../../assets/icons/broken-smartphone.png')}
              header="Oeps..."
              imageSize={60}
              onRetry={() => console.log('item pressed!')}
              buttonText="Doorgaan"
              style={Style.fallbackMessageContainer}
            />
          )}
        </View>
      </PagerView>
    </View>
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
  fallbackMessageContainer: {},
});
