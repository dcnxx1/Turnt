import {StyleSheet} from 'react-native';
import GenericScreen from '../../components/Screen/GenericScreen';
import theme from '../../theme';
import ProfileScreen from './ProfileScreen';

export default function Profile(): JSX.Element {
  const content = (
    <>
      <ProfileScreen />
    </>
  );

  return (
    <GenericScreen
      withPaddingBottom={false}
      safeAreaInsets
      style={Style.container}
      content={content}
    />
  );
}

const Style = StyleSheet.create({
  container: {
    backgroundColor: theme.color.turnerDark,
  },
});
