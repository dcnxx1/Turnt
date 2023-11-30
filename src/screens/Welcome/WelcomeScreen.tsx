import {View} from 'react-native';
import {SkeletonScreen} from '../../components';
import SkeletonFlashList from '../../components/List/SkeletonFlashList';

const welcomeScreenContent = [{}, {}, {}];

export default function WelcomeScreen(): JSX.Element {
  const content = <SkeletonFlashList />;
  const renderItem = () => {};

  return <SkeletonScreen content />;
}
