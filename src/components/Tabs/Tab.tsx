import {useEffect, useRef, useState} from 'react';
import {NativeSyntheticEvent, StyleSheet, View} from 'react-native';
import PagerView from 'react-native-pager-view';
import {Text} from 'react-native-paper';
import {ITurn} from '../../models/turn';
import {SHEET_PARTIAL_MODE} from '../Playlist/PlaylistSheet';
import SavedSongList from '../Playlist/SavedSongList';
import {QueryResult} from '../../shared/hooks/useQueryData';
import ErrorFallback from '../Error/ErrorFallback';
import {queryKey} from '../../api/api';
import getMyUploadsByUserId from '../../api/myUploads';
import useLocalProfile from '../../store/useLocalProfile';

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
    <>
      <View style={Style.tabSelectorContainer}>
        <Text>Favorieten</Text>
        <Text>Mijn uploads</Text>
      </View>
      <PagerView
        onPageSelected={onPageSelected}
        ref={ref}
        initialPage={tabKey}
        style={Style.pagerViewContainer}>
        <View key="1">
          <SavedSongList data={playlist.data} />
        </View>
        <View key="2">
          <ErrorFallback
            error={myUploads.error}
            queryKey={queryKey.myUploads}
            onRefetch={onRefetch}>
            <SavedSongList data={myUploads.data} />
          </ErrorFallback>
        </View>
      </PagerView>
    </>
  );
}

const Style = StyleSheet.create({
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
    width: '100%',
    height: '90%',
    borderWidth: 2,
    borderColor: 'yellow',
    paddingBottom: SHEET_PARTIAL_MODE,
  },
});
