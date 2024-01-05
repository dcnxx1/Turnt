import {useQueryClient} from '@tanstack/react-query';
import {StyleSheet} from 'react-native';
import {queryKey, useCDN} from '../../api/api';
import {Profile as UserProfile} from '../../api/profile';
import {AvatarWithUsername} from '../../components/Images/Avatar';
import SavedSongList from '../../components/Playlist/SavedSongList';
import {ITurn} from '../../models/turn';
export default function ProfileScreen() {
  const queryClient = useQueryClient();

  const me: UserProfile | undefined = queryClient.getQueryData([
    queryKey.profile,
  ]);
  const savedSongs: ITurn[] | undefined = queryClient.getQueryData([
    'playlist',
  ]);

  return (
    <>
      <AvatarWithUsername
        source={me?.avatar && useCDN(me.avatar)}
        username={me?.alias ? me.alias : ''}
        spacing={10}
      />

      <SavedSongList  data={savedSongs ? savedSongs : []} />
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
});
