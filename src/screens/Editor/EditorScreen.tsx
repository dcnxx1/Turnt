type Props = {
  onSubmit: () => void;
};

import {StyleSheet} from 'react-native';
import {Flex} from '../../components';
import {Text} from 'react-native-paper';

type EditorFormValues = {
  image: string;
  title: string;
};

export default function EditorScreen({onSubmit}: Props) {
  return (
    <Flex>
      <Text>Yo</Text>
    </Flex>
  );
}

const Style = StyleSheet.create({});
