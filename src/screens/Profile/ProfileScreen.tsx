import {Text} from 'react-native-paper';
import {Flex} from '../../components';
import {StyleSheet} from 'react-native';

export default function ProfileScreen() {
  
  
  return (
    <Flex style={Style.container}>
      <Text>Yo</Text>
    </Flex>
  );
}

const Style = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: 'yellow',
  },
});
