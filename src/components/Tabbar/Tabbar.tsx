import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {useState} from 'react';
import {LayoutChangeEvent} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import {MediaController} from '../MediaController';
import PlaylistSheet from '../PlaylistSheet/PlaylistSheet';
import BottomTab from './BottomTab';

type TabbarProps = {
  [P in keyof BottomTabBarProps]: BottomTabBarProps[P];
};

export default function Tabbar(props: TabbarProps) {
  const [tabHeight, setTabHeight] = useState(0);
  const animatedPosition = useSharedValue(0);

  const onLayoutBottomTab = (event: LayoutChangeEvent) => {
    const bottomTabHeight = event.nativeEvent.layout.height;
    if (tabHeight === 0) {
      setTabHeight(bottomTabHeight);
    }
  };

  return (
    <>
      {/* <MediaController
        collapseAnimationEnabled={true}
        firstSnapPoint={'5%'}
        tabHeight={tabHeight}
      /> */}

      <PlaylistSheet animatedPosition={animatedPosition} />
      <BottomTab
        animatedPosition={animatedPosition}
        onLayout={onLayoutBottomTab}
        {...props}
      />
    </>
  );
}
