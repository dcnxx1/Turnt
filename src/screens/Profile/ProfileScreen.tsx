import {useQueryClient} from '@tanstack/react-query';
import {Image, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {queryKey, useCDN} from '../../api/api';
import {Profile as UserProfile} from '../../api/profile';
import Avatar, {AvatarWithUsername} from '../../components/Images/Avatar';
export default function ProfileScreen() {
  const queryClient = useQueryClient();

  const me: UserProfile | undefined = queryClient.getQueryData([
    queryKey.profile,
  ]);

  return (
    <View style={Style.container}>
      <AvatarWithUsername
        source={me?.avatar && useCDN(me.avatar)}
        username={me?.alias ? me.alias : ''}
        spacing={10}
      />
      <Text>Some text!</Text>
    </View>
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
