import {Dimensions, Text, View, StyleSheet} from 'react-native';
import {SkeletonScreen} from '../../components';
import {withLinearGradient} from '../../components/SkeletonScreen/SkeletonScreen';
import {RouteProp, useRoute} from '@react-navigation/native';
import {EditorParams} from '../../nav/navparams';
import theme from '../../theme';

const LinearGradientScreen = withLinearGradient(SkeletonScreen);
export default function Editor(): JSX.Element {
  const {params} = useRoute<RouteProp<EditorParams>>();
  const onPressSubmitWithoutErrors = () => {};
  const content = <></>;

  console.log("params recieved: >>", params)

  return (
    <LinearGradientScreen
      gradient={[theme.color.turnerDark, '#000']}
      content={content}
      styleContent={Style.content}
    />
  );
}

const Style = StyleSheet.create({
  content: {},
});
