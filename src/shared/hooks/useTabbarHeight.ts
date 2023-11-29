import {useCallback} from 'react';
import {useTabbarStore} from '../../store';

export default function useTabbarHeight() {
  const tabbarHeight = useTabbarStore(state => state.tabbarHeight);
  const setTabbarHeight = useTabbarStore(state => state.setTabbarHeight);

  const handleTabbarHeight = useCallback(
    (height: number) => {
      setTabbarHeight(height);
    },
    [tabbarHeight],
  );

  return [tabbarHeight, handleTabbarHeight];
}
