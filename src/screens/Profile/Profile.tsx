import {StyleSheet, View} from 'react-native';
import GenericScreen from '../../components/Screen/GenericScreen';
import theme from '../../theme';
import ProfileScreen from './ProfileScreen';
import withTabbarScreen from '../../components/Tabbar/withTabbarScreen';

export default function Profile(): JSX.Element {
  const content = (
    <>
      <ProfileScreen />
    </>
  );

  return (
    <GenericScreen withPaddingBottom={false} safeAreaInsets  style={Style.container} content={content} />
  );
}

const Style = StyleSheet.create({
  container: {
    backgroundColor: theme.color.turnerDark,
  },
  contentStyle: {
    backgroundColor: 'yellow',
    borderWidth: 2,
    borderColor: 'black',
  },
  headerStyle: {
    borderWidth: 2,
    borderColor: 'green',
  },
});
