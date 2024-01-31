import {StyleSheet} from 'react-native';
import VideoList from '../../components/List/VideoList';
import GenericScreen from '../../components/Screen/GenericScreen';
import {useFeedQuery} from '../../shared/hooks/useQueryData';
import {useEffect, useLayoutEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {HomeParams} from '../../nav/navparams';

export type TestData = {
  source: string;
  id: number;
};

function HomeScreen(): JSX.Element {
  const {data: turns} = useFeedQuery();
  const navigation = useNavigation<StackNavigationProp<HomeParams>>();

  
  const content = turns && <VideoList data={turns} />;
  return <GenericScreen style={Style.container} content={content} />;
}

const Style = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});

export default HomeScreen;
