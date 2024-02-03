import {useSelector} from 'react-redux';
import {RootState} from './store';

export default function useActiveSlice() {
  const selectActiveSlice = (state: RootState) =>
    state.videoListSliceHome.isSliceActive
      ? state.videoListSliceHome
      : state.playlistSlice;
  const activeSlice = useSelector(selectActiveSlice);

  return [activeSlice];
}
