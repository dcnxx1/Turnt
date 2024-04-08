import {Dimensions, Image, StyleSheet, View} from 'react-native';
import Toast, {
  BaseToast as RNToast,
  ToastConfig,
  BaseToastProps,
} from 'react-native-toast-message';
import theme from '../../theme';
import {ReactNode} from 'react';
import {Icon, Text} from 'react-native-paper';

export function showAddToPlaylistToast({icon, text}: AddToPlaylistType) {
  Toast.show({
    text1: text,
    autoHide: true,
    visibilityTime: 2000,
    type: 'addToPlaylistToast',
    swipeable: true,
    bottomOffset: Dimensions.get('screen').height * 0.1,
    props: {
      icon,
    },
  });
}

export const toastConfig: ToastConfig = {
  successToast: ({props}) => <SuccessToast />,
  addToPlaylistToast: ({props, text1}) => (
    <AddToPlaylist text={text1 ?? ''} icon={props.icon} />
  ),
};
function SuccessToast(props: BaseToastProps) {
  return <RNToast style={Style.successToast} />;
}
type AddToPlaylistType = {
  icon: string;
  text: string;
};
function AddToPlaylist({icon, text}: AddToPlaylistType) {
  return (
    <View style={Style.addToPlaylistToast}>
      <View style={Style.iconContainer}>
        <Image
          style={{width: 50, height: 50, borderRadius: 15}}
          source={{uri: icon}}
        />
      </View>
      <View style={Style.textContainer}>
        <Text style={{color: 'white'}}>{text}</Text>
      </View>
    </View>
  );
}

export default function BaseToast() {}

const Style = StyleSheet.create({
  successToast: {
    backgroundColor: theme.color.turnerDark,
  },
  addToPlaylistToast: {
    backgroundColor: theme.color.turnerDark,
    width: '95%',
    height: 75,
    borderRadius: 15,
    flexDirection: 'row',
    padding: 10,
    gap: 10,
  },
  iconContainer: {
    borderRadius: 15,
  },
  textContainer: {
    justifyContent: 'center',
  },
});
