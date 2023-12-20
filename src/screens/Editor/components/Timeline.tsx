import {Dimensions, StyleSheet} from 'react-native';
import {Flex} from '../../../components';
import {Text} from 'react-native-paper';
import ffmpeg from 'ffmpeg-kit-react-native';
import {getThumbnails} from '../../../helpers';
const screenWidth = Dimensions.get('screen').width;
import RNFS from 'react-native-fs';

type Props = {
  duration: number;
  filePath: string;
};

const generateTimeline = async (filePath: string) => {
  try {
    const DirPath = RNFS.CachesDirectoryPath;
    const string = getThumbnails(filePath, DirPath);
  } catch (err) {
    console.log('err', err);
  }
};

export default function Timeline() {
  return (
    <Flex>
      <Text>Timeline goes here!</Text>
    </Flex>
  );
}

const Style = StyleSheet.create({});
