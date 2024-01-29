import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';

import {BottomSheetMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {useEffect, useRef} from 'react';
import {setPosition} from '../../../redux/playlistSheetSlice';
import {debounce, throttle} from 'lodash';
import {setActiveSlice} from '../../../redux/videoListSlice';

export default function usePlaylistSheet(): [
  ref: React.RefObject<BottomSheetMethods>,
  onChangeBottomSheetPosition: (index: number) => void,
] {
  const ref = useRef<BottomSheetMethods>(null);
  const position = useSelector(
    (state: RootState) => state.playlistSheetSlice.position,
  );
  const dispatch = useDispatch();
  const isActivePlaylistSlice = useSelector(
    (state: RootState) => state.playlistSlice.isActive,
  );
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
      switch (position) {
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
  }, [ref, position]);

  return [ref, onChangeBottomSheetPosition];
}
