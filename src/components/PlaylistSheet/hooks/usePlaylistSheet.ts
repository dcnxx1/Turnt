import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';

import {BottomSheetMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {useEffect, useRef} from 'react';
import {setPosition} from '../../../redux/playlistSheetSlice';

export default function usePlaylistSheet(): [
  ref: React.RefObject<BottomSheetMethods>,
  onChangeBottomSheetPosition: (index: number) => void,
] {
  const ref = useRef<BottomSheetMethods>(null);
 
  const dispatch = useDispatch();
  const playlistSheetSlice = useSelector((state: RootState) => state.playlistSheetSlice);

  const onChangeBottomSheetPosition = (index: number) => {
    if (index === 0) {
      dispatch(setPosition('Partial'));
      return;
    }
    if (index === 1) {
      dispatch(setPosition('FullScreen'));
      return;
    }
    if (index === -1) {
      dispatch(setPosition('Hidden'));
      return;
    }
  };

  useEffect(() => {
    if (ref) {
      switch (playlistSheetSlice.bottomSheetPosition) {
        case 'FullScreen': {
          ref.current?.snapToIndex(1);
          break;
        }
        case 'Partial': {
          ref.current?.snapToIndex(0);
          break;
        }
        case 'Hidden': {
          ref.current?.close();
          break;
        }
        default: {
          ref.current?.close();
          break;
        }
      }
    }
  }, [ref, playlistSheetSlice.bottomSheetPosition]);

  return [ref, onChangeBottomSheetPosition];
}
