import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useQueryClient} from '@tanstack/react-query';
import {Image, StyleSheet} from 'react-native';
import {Flex} from '../../components';
import SkeletonScreen from '../../components/SkeletonScreen/SkeletonScreen';
import {HomeParams} from '../../nav/navparams';
import theme from '../../theme';
import ProfileScreen from './ProfileScreen';
import {Text} from 'react-native-paper';
import {queryKey, useCDN} from '../../api/api';
import {Profile as UserProfile} from '../../api/profile';
import EditableImage from '../../components/Images/EditableImage';
import {COVER_KEY, PF_USER_KEY} from '../../s3';

export default function Profile(): JSX.Element {
  const navigation = useNavigation<StackNavigationProp<HomeParams>>();
  const queryClient = useQueryClient();
  console.log("profiel rendered")
  const me: UserProfile | undefined = queryClient.getQueryData([
    queryKey.profile,
  ]);

  const onPressNavigateEditor = () => {
    navigation.navigate('EditorStack');
  };

  const header = (
    <>
      <Flex style={{borderWidth: 2, borderColor: 'yellow'}}>
        <Image
          style={Style.avatar}
          source={{uri: useCDN(PF_USER_KEY + me?.avatar)}}
        />
      </Flex>
    </>
  );

  const content = <ProfileScreen />;

  return (
    <SkeletonScreen
      hasSafeAreaInsets
      header={header}
      headerStyle={Style.headerStyle}
      content={content}
      contentStyle={Style.container}
    />
  );
}

const Style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.color.turnerDark,
  },
  headerStyle: {
    borderWidth: 2,
    borderColor: 'green',
    padding: 100,
  },
  avatar: {
    width: 100,
    height: 100,
   
  },
});
