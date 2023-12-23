import {StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {Flex} from '../../../components';
import EditableImage from '../../../components/Images/EditableImage';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function CoverSelect({value, onChange}: Props) {
  return (
    <Flex style={Style.container}>
      <Text style={Style.text}>Druk hieronder om een cover foto te kiezen</Text>
      <EditableImage
        size={200}
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
