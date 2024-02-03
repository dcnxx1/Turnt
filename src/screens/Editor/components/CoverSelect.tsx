import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Flex } from '../../../components';
import EditableImage from '../../../components/Images/EditableImage';
import { VideoCoverColor } from '../utils';
type Props = {
  value: string;
  onChange: (value: string) => void;
  defaultCoverColor: VideoCoverColor;
};

export default function CoverSelect({
  value,
  onChange,
  defaultCoverColor,
}: Props) {
  return (
    <Flex style={Style.container}>
      <Text style={Style.text}>Druk hieronder om een cover foto te kiezen</Text>
      <EditableImage
        size={200}
        defaultCover={defaultCoverColor}
        isAvatar={false}
        source={value}
        setSource={onChange}
      />
    </Flex>
  );
}

const Style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  imageContainer: {
    borderWidth: 2,
    borderColor: 'red',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});
