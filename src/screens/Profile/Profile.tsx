import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Pressable, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import SkeletonScreen from '../../components/SkeletonScreen/SkeletonScreen';
import {HomeParams} from '../../nav/navparams';
import theme from '../../theme';
import {removeLocalUserProfile} from '../../app/boot';

export default function Profile(): JSX.Element {
  const navigation = useNavigation<StackNavigationProp<HomeParams>>();
  const onPressNavigateEditor = () => {
    navigation.navigate('EditorStack');
  };

  const content = (
    <Pressable onPress={removeLocalUserProfile}>
      <Text>Go to editor</Text>
    </Pressable>
  );

  return <SkeletonScreen content={content} contentStyle={Style.container} />;
}

const Style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.color.turnerDark,
  },
});
