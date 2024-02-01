import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {
  useMyPlaylistQuery,
  useMyUploadsQuery,
} from '../../shared/hooks/useQueryData';

import MediaController from '../MediaController/MediaController';
import {FIRST_SNAP_POINT_MEDIACONTROLLER} from './PlaylistSheet';
import {useEffect} from 'react';

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
      
      <MediaController
        collapseAnimationEnabled
        tabHeight={1}
        firstSnapPoint={FIRST_SNAP_POINT_MEDIACONTROLLER}
      />
    </>
  );
}
