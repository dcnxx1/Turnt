import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {useState} from 'react';
import {LayoutChangeEvent} from 'react-native';
import MediaController from '../MediaController/MediaController';
import PlaylistSheet from '../Playlist/PlaylistSheet';
import BottomTab from './BottomTab';

type TabbarProps = {
  [P in keyof BottomTabBarProps]: BottomTabBarProps[P];
};

export default function Tabbar(props: TabbarProps) {
  const [tabHeight, setTabHeight] = useState(0);

  const onLayoutBottomTab = (event: LayoutChangeEvent) => {
    const bottomTabHeight = event.nativeEvent.layout.height;
    setTabHeight(bottomTabHeight);
  };

  return (
    <>
      <MediaController tabHeight={tabHeight} />

      <PlaylistSheet tabHeight={tabHeight} />

      <BottomTab onLayout={onLayoutBottomTab} {...props} />
    </>
  );
}
