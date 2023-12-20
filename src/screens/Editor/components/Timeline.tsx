import {Dimensions, StyleSheet} from 'react-native';
import {Flex} from '../../../components';
import {Text} from 'react-native-paper';

const screenWidth = Dimensions.get('screen').width;

type Props = {
  duration: number;
  filePath: string;
};

const generateTimeline = async () => {};

export default function Timeline() {
  return (
    <Flex>
      <Text>Timeline goes here!</Text>
    </Flex>
  );
}

const Style = StyleSheet.create({});
