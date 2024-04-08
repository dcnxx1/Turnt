import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {useState} from 'react';
import {LayoutChangeEvent} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import MediaController from '../MediaController/MediaController';
import PlaylistSheet from '../PlaylistSheet/PlaylistSheet';
import BottomTab from './BottomTab';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';

type TabbarProps = {
  [P in keyof BottomTabBarProps]: BottomTabBarProps[P];
};

export default function Tabbar(props: TabbarProps) {
  const [tabHeight, setTabHeight] = useState(0);
  const animatedPosition = useSharedValue(0);
  const activeSlice = useSelector(
    (state: RootState) => state.homeSlice.isActive,
  );
  const onLayoutBottomTab = (event: LayoutChangeEvent) => {
    const bottomTabHeight = event.nativeEvent.layout.height;
    if (tabHeight === 0) {
      setTabHeight(bottomTabHeight);
    }
  };

  return (
    <>
      {activeSlice && (
        <MediaController
          showImpressionButton
          collapseAnimationEnabled={true}
          firstSnapPoint={'8%'}
          tabHeight={tabHeight}
        />
      )}

      <PlaylistSheet animatedPosition={animatedPosition} />
      <BottomTab
        animatedPosition={animatedPosition}
        onLayout={onLayoutBottomTab}
        {...props}
      />
    </>
  );
}
