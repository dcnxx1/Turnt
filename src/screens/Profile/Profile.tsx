import { StyleSheet } from 'react-native';
import GenericScreen from '../../components/SkeletonScreen/GenericScreen';
import theme from '../../theme';
import ProfileScreen from './ProfileScreen';

export default function Profile(): JSX.Element {
  const content = (
    <>
      <ProfileScreen />
    </>
  );

  return (
    <GenericScreen safeAreaInsets style={Style.container} content={content} />
  );
}

const Style = StyleSheet.create({
  container: {
    backgroundColor: theme.color.turnerDark,
  },
  contentStyle: {
    backgroundColor: 'yellow',
  },
  headerStyle: {
    borderWidth: 2,
    borderColor: 'green',
    padding: 100,
  },
});
