import {useSelector} from 'react-redux';
import {RootState} from './store';

export default function useActiveSlice() {
    const activeSlice = (state: RootState) => state.homeVideoSlice.isActive ? state.homeVideoSlice : state.playlistVideoSlice
    return useSelector(activeSlice)
}
