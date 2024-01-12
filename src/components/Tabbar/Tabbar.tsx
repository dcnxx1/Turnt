import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {useState} from 'react';
import {LayoutChangeEvent} from 'react-native';
import MediaController from '../MediaController/MediaController';
import PlaylistSheet from '../Playlist/PlaylistSheet';
import BottomTab from './BottomTab';
import {useSharedValue} from 'react-native-reanimated';

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
      <MediaController tabHeight={tabHeight} />

      <PlaylistSheet
        animatedPosition={animatedPosition}
        tabHeight={tabHeight}
      />

      <BottomTab
        animatedPosition={animatedPosition}
        onLayout={onLayoutBottomTab}
        {...props}
      />
    </>
  );
}
