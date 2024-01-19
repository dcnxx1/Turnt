import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {Pressable, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {queryKey, useCDN} from '../../api/api';
import {Profile as UserProfile} from '../../api/profile';
import {AvatarWithUsername} from '../../components/Images/Avatar';
import {MINIPLAYER_HEIGHT} from '../../components/PlaylistSheet/components/Miniplayer';
import Tab from '../../components/Tabs/Tab';
import {ITurn} from '../../models/turn';
import {HomeParams} from '../../nav/navparams';
import {RootState} from '../../redux/store';
import useQueryData from '../../shared/hooks/useQueryData';
import useLocalProfile from '../../store/useLocalProfile';
import {Animated} from 'react-native';
import {Text} from 'react-native-paper';
import getMyUploadsByUserId from '../../api/myUploads';
export default function ProfileScreen() {
  const queryClient = useQueryClient();
  const remoteProfile: UserProfile | undefined = queryClient.getQueryData([
    queryKey.profile,
  ]);
  const isPlaylistSliceActive = useSelector(
    (state: RootState) => state.playlistSlice.isActive,
  );
  const me = useLocalProfile();

  const {data: playlistData, error: playlistError} = useQuery<ITurn[]>({
    queryKey: [queryKey.playlist],
  });
  const {data: myUploadsData, error: myUploadsError} = useQuery<ITurn[]>({
    queryKey: [queryKey.myUploads],
    initialData: queryClient.getQueryData([queryKey.myUploads]),
  });

  const playlistQueryState = queryClient.getQueryState([queryKey.playlist]);
  const navigation = useNavigation<StackNavigationProp<HomeParams>>();

  const onPressUpload = () => {
    navigation.navigate('EditorStack');
  };

  return (
    <>
      <AvatarWithUsername
        source={remoteProfile?.avatar && useCDN(remoteProfile.avatar)}
        username={remoteProfile?.alias ? remoteProfile.alias : ''}
        spacing={10}
      />
      {me.user?.role === 'Artist' && (
        <Pressable onPress={onPressUpload} style={Style.uploadButton}>
          <Text style={Style.text}>Uploaden</Text>
        </Pressable>
      )}

      <Tab
        style={{paddingBottom: isPlaylistSliceActive ? MINIPLAYER_HEIGHT : 0}}
        playlist={{data: playlistData, error: playlistError}}
        myUploads={{data: myUploadsData, error: myUploadsError}}
      />
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
  text: {
    color: 'white',
    fontSize: 18,
  },
  uploadButton: {
    borderWidth: 2,
    borderColor: 'pink',
    padding: 5,
    paddingHorizontal: 10,
    alignSelf: 'center',
    margin: 5,
    borderRadius: 15,
  },
});
