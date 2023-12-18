import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import BottomTab from './BottomTab';
import MediaController from '../MediaController/MediaController';
import {useState} from 'react';

type TabbarProps = {
  [P in keyof BottomTabBarProps]: BottomTabBarProps[P];
};

export default function Tabbar(props: TabbarProps) {
  const [tabHeight, setTabHeight] = useState(0);
  const onLayoutBottomTab = () => {};

  return (
    <>
      <MediaController />
      <BottomTab {...props} />
    </>
  );
}
