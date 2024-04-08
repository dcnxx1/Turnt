import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import Flex from '../Misc/Flex';
import {Text, Icon} from 'react-native-paper';

interface ErrorMessageProps {
  message: string;
  backgroundColor?: string;
  icon: any;
  iconSize?: number;
}

export default function Message({
  message,
  backgroundColor,
  icon,
  iconSize,
}: ErrorMessageProps) {
  const styles: Partial<ViewStyle> = {
    backgroundColor: backgroundColor ? backgroundColor : 'white',
  };

  return (
    <View style={[Style.container, styles]}>
      <Icon size={iconSize || 25} source={icon} />
      <Text style={Style.text}>{message}</Text>
    </View>
  );
}

const Style = StyleSheet.create({
  container: {
    borderRadius: 5,
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  text: {
    color: 'red',
  },
});
