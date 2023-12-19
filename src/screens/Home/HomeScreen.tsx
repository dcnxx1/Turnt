import {StyleSheet} from 'react-native';
import {SkeletonScreen} from '../../components';
import CollectionTurn from '../../components/List/CollectionTurn';
import TurnContextProvider from '../../shared/context/TurnContext';

export type TestData = {
  source: string;
  id: number;
};

function HomeScreen(): JSX.Element {
  const data: TestData[] = [
    {
      id: 1,
      source:
        'https://dxhr72btgprfv.cloudfront.net/uploads/turns/5116-4a4c2c6f72c3-61f96261-1795-48ac-9f48-4a4c2c6f72c3.mp4',
    },
    {
      id: 2,
      source:
        'https://dxhr72btgprfv.cloudfront.net/uploads/turns/fxwk-4a4c2c6f72c3-61f96261-1795-48ac-9f48-4a4c2c6f72c3.mp4',
    },
  ];
  const content = (
    <TurnContextProvider>
      <CollectionTurn data={data} />
    </TurnContextProvider>
  );

  return <SkeletonScreen style={Style.container} content={content} />;
}

const Style = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});

export default HomeScreen;
