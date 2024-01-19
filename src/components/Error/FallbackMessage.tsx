import {Pressable, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {Icon, Text} from 'react-native-paper';
type Props = {
  imageHeader: any;
  header: string;
  message: string;
  imageSize?: number;
  buttonText: string;
  headerTextSize?: number;
  messageTextSize?: number;
  onRetry?: () => void;
  style?: StyleProp<ViewStyle>;
};

export default function FallbackMessage({
  imageSize = 25,
  header,
  message,
  imageHeader,
  buttonText,
  messageTextSize = 25,
  headerTextSize = 25,
  onRetry,
  style,
}: Partial<Props>) {
  return (
    <View style={[Style.container, style]}>
      <View style={Style.imageContainer}>
        <Icon size={imageSize} source={imageHeader} />
      </View>
      <View>
        <Text style={{fontSize: headerTextSize}}>{header}</Text>
        <Text style={{fontSize: messageTextSize}}>{message}</Text>
      </View>
      <View style={Style.buttonContainer}>
        <Pressable style={Style.pressable} onPress={onRetry}>
          <Text>{buttonText}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const Style = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: 'blue',
    height: '100%',
    backgroundColor: 'green',
  },
  imageContainer: {},
  headerText: {
    color: 'white',
    fontSize: 25,
  },
  messageText: {
    color: 'white',
    fontSize: 25,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 22,
  },
  pressable: {
    padding: 5,
    borderWidth: 2,
  },
});
