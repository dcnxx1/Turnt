import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import BottomTab from './BottomTab';
import MediaController from '../MediaController/MediaController';
import {useState} from 'react';
import {LayoutChangeEvent} from 'react-native';
import PlaylistSheet from '../Playlist/PlaylistSheet';
import usePlaybackSourceStore from '../../store/usePlaybackSourceStore';

type TabbarProps = {
  [P in keyof BottomTabBarProps]: BottomTabBarProps[P];
};

export default function Tabbar(props: TabbarProps) {
  const [tabHeight, setTabHeight] = useState(0);
  const playbackSource = usePlaybackSourceStore(state => state.playbackSource);

  const onLayoutBottomTab = (event: LayoutChangeEvent) => {
    const bottomTabHeight = event.nativeEvent.layout.height;
    setTabHeight(bottomTabHeight);
  };

  return (
    <>
      {playbackSource === 'Home' ? (
        <MediaController tabHeight={tabHeight} />
      ) : (
        <PlaylistSheet tabHeight={tabHeight} />
      )}

      <BottomTab onLayout={onLayoutBottomTab} {...props} />
    </>
  );
}
