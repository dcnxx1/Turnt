import {useSelector} from 'react-redux';
import {RootState} from './store';

export default function useActiveSlice() {
  const activeSlice = useSelector((state: RootState) =>
    state.homeSlice.isActive ? state.homeSlice : state.playlistSlice,
  );

  return [activeSlice];
}
