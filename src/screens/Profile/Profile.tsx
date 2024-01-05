import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useQueryClient} from '@tanstack/react-query';
import {StyleSheet} from 'react-native';
import {queryKey} from '../../api/api';
import {Profile as UserProfile} from '../../api/profile';
import GenericScreen from '../../components/SkeletonScreen/GenericScreen';
import {HomeParams} from '../../nav/navparams';
import theme from '../../theme';
import ProfileScreen from './ProfileScreen';

export default function Profile(): JSX.Element {
  const navigation = useNavigation<StackNavigationProp<HomeParams>>();
  const queryClient = useQueryClient();

  const me: UserProfile | undefined = queryClient.getQueryData([
    queryKey.profile,
  ]);

  const onPressNavigateEditor = () => {
    navigation.navigate('EditorStack');
  };

  const content = <ProfileScreen />;

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
