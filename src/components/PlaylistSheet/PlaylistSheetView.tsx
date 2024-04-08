import {useSelector} from 'react-redux';
import {
  useMyPlaylistQuery,
  useMyUploadsQuery,
} from '../../shared/hooks/useQueryData';
import PlaylistVideoManager from '../List/VideoListManagers/PlaylistVideoManager';
import MediaController from '../MediaController/MediaController';
import {FIRST_SNAP_POINT_MEDIACONTROLLER} from './PlaylistSheet';
import {RootState} from '../../redux/store';

type Props = {};

export default function PlaylistSheetView({}: Props) {
  const playlistSheetSlice = useSelector(
    (state: RootState) => state.playlistSheetSlice,
  );
  const playlist = useMyPlaylistQuery();
  const myUploads = useMyUploadsQuery();
  const data = playlistSheetSlice.data === 'playlist' ? playlist : myUploads;

  return (
    <>
      <PlaylistVideoManager data={data.data ?? []} />
      <MediaController
        showImpressionButton={false}
        collapseAnimationEnabled
        tabHeight={1}
        firstSnapPoint={FIRST_SNAP_POINT_MEDIACONTROLLER}
      />
    </>
  );
}
