import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {useCDN} from '../../api/api';
import {AvatarWithUsername} from '../../components/Images/Avatar';
import {MINIPLAYER_HEIGHT} from '../../components/PlaylistSheet/components/Miniplayer';
import Tab from '../../components/Tabs/Tab';
import {HomeParams} from '../../nav/navparams';
import {RootState} from '../../redux/store';
import {
  useMyPlaylistQuery,
  useMyRemoteProfile,
  useMyUploadsQuery,
} from '../../shared/hooks/useQueryData';
import useLocalProfile from '../../store/useLocalProfile';
export default function ProfileScreen() {
  const remoteProfile = useMyRemoteProfile();
  const me = useLocalProfile();
  const myPlaylistData = useMyPlaylistQuery();
  const myUploadsData = useMyUploadsQuery();
  const navigation = useNavigation<StackNavigationProp<HomeParams>>();

  const isPlaylistSliceActive = useSelector(
    (state: RootState) => state.playlistSlice.isActive,
  );

  const onPressUpload = () => {
    navigation.push('EditorStack');
  };

  return (
    <>
      <AvatarWithUsername
        source={remoteProfile.data?.alias && useCDN(remoteProfile.data.avatar)}
        username={remoteProfile?.data?.alias ? remoteProfile?.data?.alias : ''}
        spacing={10}
      />
      {me.user?.role === 'Artist' && (
        <Pressable onPress={onPressUpload} style={Style.uploadButton}>
          <Text style={Style.text}>Uploaden</Text>
        </Pressable>
      )}
      <Tab
        style={{paddingBottom: isPlaylistSliceActive ? MINIPLAYER_HEIGHT : 0}}
        playlist={myPlaylistData}
        myUploads={myUploadsData}
      />
    </>
  );
}

const Style = StyleSheet.create({
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
