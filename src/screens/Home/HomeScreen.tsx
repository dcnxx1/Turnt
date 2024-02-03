import {FlashList} from '@shopify/flash-list';
import {useRef} from 'react';
import {StyleSheet} from 'react-native';
import GenericScreen from '../../components/Screen/GenericScreen';
import {ITurn} from '../../models/turn';
import {useFeedQuery} from '../../shared/hooks/useQueryData';
import {Text} from 'react-native-paper';

function HomeScreen(): JSX.Element {
  const {data: turns} = useFeedQuery();

  const ref = useRef<FlashList<ITurn>>(null);
  const content = <Text>Text</Text>;
  return <GenericScreen style={Style.container} content={content} />;
}

const Style = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});

export default HomeScreen;
