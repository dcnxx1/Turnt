import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {
  useMyPlaylistQuery,
  useMyUploadsQuery,
} from '../../shared/hooks/useQueryData';

import {FlashList} from '@shopify/flash-list';
import {Dimensions, Text, View} from 'react-native';
import {MediaController} from '../MediaController';
import {FIRST_SNAP_POINT_MEDIACONTROLLER} from './PlaylistSheet';
import PlaylistVideoManager from '../List/VideoListManagers/PlaylistVideoManager';

type Props = {};

export default function PlaylistSheetView({}: Props) {
  const playlistSheetSlice = useSelector(
    (state: RootState) => state.playlistSheetSlice,
  );

  const playlist = useMyPlaylistQuery();
  const myUploads = useMyUploadsQuery();
  const data = playlistSheetSlice.data === 'playlist' ? playlist : myUploads;
  const dispatch = useDispatch();

  return (
    <>
      <PlaylistVideoManager data={data.data ?? []} />
      <MediaController
        collapseAnimationEnabled
        tabHeight={1}
        firstSnapPoint={FIRST_SNAP_POINT_MEDIACONTROLLER}
      />
    </>
  );
}
