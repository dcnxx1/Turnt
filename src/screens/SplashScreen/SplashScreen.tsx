import {Animated, Dimensions, StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SkeletonScreen, {
  withLinearGradient,
} from '../../components/SkeletonScreen/SkeletonScreen';
import theme from '../../theme';
const {width: SCREEN_WIDTH} = Dimensions.get('screen');
const {height: SCREEN_HEIGHT} = Dimensions.get('screen');
const LinearGradientScreen = withLinearGradient(SkeletonScreen);
export default function SplashScreen() {
  const content = (
    <Animated.Image source={require('../../assets/icons/turnt_white.png')} />
  );

  return (
    <SafeAreaProvider style={{flex: 1}}>
      <Animated.View style={Style.container}>
        <LinearGradientScreen
          content={content}
          gradient={[theme.color.turner, theme.color.turnerPurple]}
        />
      </Animated.View>
    </SafeAreaProvider>
  );
}

const Style = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
});
