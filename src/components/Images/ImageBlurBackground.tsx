import {Image, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

type ImageBlurBackgroundProps = {
  source: string | any;
  style?: StyleProp<ViewStyle>;
};

export default function ImageBlurBackground({
  source,
  style,
}: ImageBlurBackgroundProps) {
  return (
    <View style={[style, Style.container]}>
      <Image style={Style.backgroundImage} blurRadius={3} source={source} />
      <View style={Style.coverContainer}>
        <Image style={Style.coverImage} source={source} />
      </View>
    </View>
  );
}

const Style = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    borderWidth: 2,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },
  coverContainer: {
    width: '100%',
    height: '50%',
    padding: 20,
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
});
