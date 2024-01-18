import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useQueryClient} from '@tanstack/react-query';
import {StyleSheet} from 'react-native';
import {queryKey, useCDN} from '../../api/api';
import {Profile as UserProfile} from '../../api/profile';
import {AvatarWithUsername} from '../../components/Images/Avatar';
import Tab from '../../components/Tabs/Tab';
import {ITurn} from '../../models/turn';
import {HomeParams} from '../../nav/navparams';
import useQueryData from '../../shared/hooks/useQueryData';
import useLocalProfile from '../../store/useLocalProfile';
import {useEffect} from 'react';

export default function ProfileScreen() {
  const queryClient = useQueryClient();
  const remoteProfile: UserProfile | undefined = queryClient.getQueryData([
    queryKey.profile,
  ]);

  const me = useLocalProfile();

  const playlist = useQueryData<ITurn>(queryKey.playlist);
  const myUploads = useQueryData<ITurn>(queryKey.myUploads);

  const playlistQueryState = queryClient.getQueryState([queryKey.playlist]);
  const navigation = useNavigation<StackNavigationProp<HomeParams>>();


  return (
    <>
      <AvatarWithUsername
        source={remoteProfile?.avatar && useCDN(remoteProfile.avatar)}
        username={remoteProfile?.alias ? remoteProfile.alias : ''}
        spacing={10}
      />

      <Tab playlist={playlist} myUploads={myUploads} />
    </>
  );
}

const Style = StyleSheet.create({
  container: {
    borderWidth: 5,
    borderColor: 'red',
  },
  avatar: {
    width: 100,
    height: 100,
  },
  tabContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  tabItem: {
    borderWidth: 2,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
