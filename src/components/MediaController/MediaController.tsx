import {Text} from 'react-native-paper';
import Flex from '../Misc/Flex';
import {StyleSheet} from 'react-native';
import MediaControllerView from './MediaControllerView';
import { useState } from 'react';

export default function MediaController() {
  const [progress, setProgress] = useState(0)

  return <MediaControllerView />;
}

const Style = StyleSheet.create({
  container: {
    borderWidth: 2,
  },
});
